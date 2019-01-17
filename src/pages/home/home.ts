import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams , LoadingController} from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {



  itemProduct: Observable<any[]>;
  itemProduct2: Observable<any[]>;
  itemProduct3: Observable<any[]>;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase
    , private storage: AngularFireStorage, public loadingCtrl: LoadingController) {

      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...',
      });

      loading.present().then(() => {

        this.itemProduct = db.list('/product', ref => ref.orderByChild('title'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })

      this.itemProduct2 = db.list('/product2', ref => ref.orderByChild('title'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })

      this.itemProduct3 = db.list('/product3', ref => ref.orderByChild('title'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })

        loading.dismiss();
      }) //loading

    } //constructor

    goWatPage(item){
      this.navCtrl.push("WatPage");

      this.db.object(`product/${item.key}/view`).query.ref.transaction((view => {

        if (view === null) {
          return view = 1;
      } else {
          return view + 1;
      }

      }))
    } //goWatPage
    goVolunteerPage(item){
      this.navCtrl.push("VolunteerPage");

      this.db.object(`product2/${item.key}/view`).query.ref.transaction((view => {

        if (view === null) {
          return view = 1;
      } else {
          return view + 1;
      }

      }))

    }

    goTravelPage(item){
      this.navCtrl.push("TravelPage");
      this.db.object(`product3/${item.key}/view`).query.ref.transaction((view => {

        if (view === null) {
          return view = 1;
      } else {
          return view + 1;
      }

      }))
    } //goWatPage
    

    add(){
      let itemRef = this.db.list('product3');
      let data = {
        image:"",
        title:"สถานที่ท่องเที่ยว",
        name:"",
        view:30,
      }
      itemRef.push(data)
    }


    incrementLike(item){
      this.db.object(`product/${item.key}/view`).query.ref.transaction((view => {

        if (view === null) {
          return view = 1;
      } else {
          return view + 1;
      }

      }))
    }

  } //class

  

  

   


