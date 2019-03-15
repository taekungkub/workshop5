import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private fire: AngularFireAuth,
              public modalController: ModalController) {

                this.itemSuggestion = db.list('/suggestion', ref => ref.orderByChild('timestamp'))
              .snapshotChanges()
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSuggestionPage');
  }

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

    modal.present();
  }

}
