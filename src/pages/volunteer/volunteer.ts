import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { WatdetailsPage } from '../WatDetails/WatDetails';
/**
 * Generated class for the VolunteerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
})
export class VolunteerPage {
  itemsVolunteer: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private storage: AngularFireStorage
        , public loadingCtrl: LoadingController) {

          let loading = this.loadingCtrl.create({
            spinner: 'circles',
            content: 'Please wait...',
           });
           loading.present().then(()=>{
            this.itemsVolunteer = db.list('/volunteer' , ref =>ref.orderByChild('title'))
            .snapshotChanges().map(result => {
              return result.reverse();
            })
            loading.dismiss();
           })
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerPage');
  }
}
