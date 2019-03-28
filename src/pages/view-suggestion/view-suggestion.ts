import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { map } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-view-suggestion',
  templateUrl: 'view-suggestion.html',
})
export class ViewSuggestionPage {

  itemSuggestion: Observable<any[]>;

  read=false
 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private fire: AngularFireAuth,
              public modalController: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController
    ,) {

      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...',
      });
      loading.present().then(() => {
            

                this.itemSuggestion = db.list('/suggestion', ref => ref.orderByChild('timestamp'))
              .snapshotChanges()
              loading.dismiss();
            }) //loadin
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSuggestionPage');
  }

  toast2(message: string,item) {
    this.toastCtrl.create({
      message: 'คุณได้ทำการลบ ' + item.payload.val().title + ' สำเร็จแล้ว',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  onClickDelete(item) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'คุณต้องการจะลบหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Comfirm delete');

            console.log("key" + JSON.stringify(item));
            let itemRef = this.db.list('suggestion');
            itemRef.remove(item.key);
            this.toast2("",item);
           
          }
        }
      ]
    });
    alert.present();
  }//onClickDelete

  presentSuggestionModal(item) {
    let data = {
      name : item.payload.val().name,
      email : item.payload.val().email,
      tel : item.payload.val().tel,
      title : item.payload.val().title,
      desc : item.payload.val().desc,
    
      timestamp : item.payload.val().timestamp,
      }
    const modal = this.modalController.create('ViewSuggestionModalPage',data)
    console.log("รายละเอียด: "+ name)

    let read = "อ่านแล้ว";
    let itemRef = this.db.list('suggestion');
    itemRef.update(item.key,{read});
    console.log("key: " + item.key)

 
    modal.present();
  }


 
    

}
