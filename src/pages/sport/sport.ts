import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

/**
 * Generated class for the SportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sport',
  templateUrl: 'sport.html',
})
export class SportPage {
  itemsSport: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase
            , private storage: AngularFireStorage, public loadingCtrl: LoadingController) {

   // this.items = db.list('/wat').valueChanges();
   let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'Please wait...',
   });
   loading.present().then(() => {
    this.itemsSport = db.list('/sport', ref => ref.orderByChild('title'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })
    loading.dismiss();
   })
 
  } //constructor
  /*  this.items = db.list('/wat', ref => ref.orderByChild('name').equalTo("วัดมูลจิลดาราม")).valueChanges(); */



  

  ionViewDidLoad() {
    console.log('SportPage');
  }

  goSportDetails(item){
    let data = {

    title: item.payload.val().title,
    name : item.payload.val().name,
    time : item.payload.val().time,
    call : item.payload.val().call,
    desc : item.payload.val().desc,
    track : item.payload.val().track,
    imageURL:item.payload.val().imageURL,
    imageURL2 : item.payload.val().imageURL2,
    imageURL3 : item.payload.val().imageURL3,
    imageURL4 : item.payload.val().imageURL4
    }
    this.navCtrl.push("SportDetails",data);
    console.log("Item Key" + item)

    this.db.object(`sport/${item.key}/view`).query.ref.transaction((view => {

      if (view === null) {
        return view = 1;
    } else {
        return view + 1;
    }

    }))


  } //goSportDetails

} //class
