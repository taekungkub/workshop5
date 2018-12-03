import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { WatdetailsPage } from '../watdetails/watdetails';




/**
 * Generated class for the WatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wat',
  templateUrl: 'wat.html',
})
export class WatPage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase
            , private storage: AngularFireStorage, public loadingCtrl: LoadingController) {

   // this.items = db.list('/wat').valueChanges();
   let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'Please wait...',
   });
   loading.present().then(()=>{
    this.items = db.list('/wat' , ref =>ref.orderByChild('title'))
    .snapshotChanges().map(result => {
      return result.reverse();
    })
    loading.dismiss();
   })
 
  } //constructor
  /*  this.items = db.list('/wat', ref => ref.orderByChild('name').equalTo("วัดมูลจิลดาราม")).valueChanges(); */



  

  ionViewDidLoad() {
    console.log('WatPage');
    console.log(this.items);

  }

  goWatdetailsPage(item){
    this.navCtrl.push(WatdetailsPage,{item:item});
    console.log("Item Key" + this.items)

  }

}
