import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  itemsUser: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams ,private db: AngularFireDatabase
              , private alertCtrl: AlertController) {

    this.itemsUser = db.list('/user')
    .snapshotChanges().map(result => {
      return result.reverse();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();

  }

  member(item){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "member",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
    let itemRef = this.db.list('user');
    itemRef.update(item.key,{"status": "member"});
    console.log("Status " + user.displayName)
    this.alert("เปลี่ยนสถานะเรียบร้อยแล้ว")
  }//member

  admin(item){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "admin",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
    let itemRef = this.db.list('user');
    itemRef.update(item.key,{"status": "admin","photoURL":"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"});
    console.log("Status " + user.displayName)
    this.alert("เปลี่ยนสถานะเรียบร้อยแล้ว")
  } //admin

}
