import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , AlertController 
  ,ToastController , LoadingController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { map } from 'rxjs/operators';



import * as firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {


  itemsUser: Observable<any[]>;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    private fire: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {

      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...',
      });
      loading.present().then(() => {
        this.itemsUser = db.list('/user')
        .snapshotChanges()
    
        loading.dismiss();
      }) //loadin

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ViewDataUser(item){

    let data = {
      fullname : item.payload.val().fullname,
      email : item.payload.val().email,
      status : item.payload.val().status,
      photoURL : item.payload.val().photoURL,
      }
    const modal = this.modalController.create('ModalPage',data)
    modal.present();
  }

}
