import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import * as firebase from "firebase";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';





import { AlertController } from 'ionic-angular';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  AddButton = false;

  facebook = {
    loggedin: false,
    name: '',
    profilePicture: '',
    email: '',
  }

  itemsUser: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, private alertCtrl: AlertController
    , private db: AngularFireDatabase) {

    this.itemsUser = db.list('/user', ref => ref.orderByChild('fullname'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  LoginFacebook() {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      console.log(res);
      this.facebook.loggedin = true
      this.facebook.name = res.user.displayName;
      this.facebook.email = res.user.email;
      this.facebook.profilePicture = res.user.photoURL;
      if (res) {
        // User is signed in.
        // this.navCtrl.setRoot(UserPage , { facebook: this.facebook })
        //   this.navCtrl.push(UserPage)

        if (this.facebook.name = "Kieattisak Suparit") {
          this.AddButton = true;
        }

      } else {
        // No user is signed in.
      }
    })

  }




  alert(message: string) {
    this.alertCtrl.create({
      title: message,
      subTitle: "",
      buttons: ['OK']
    }).present();

  }

  email: string;
  password: string;

  signIn() {
    if (this.email == null && this.password == null) {
      this.alert("กรุณากรอกอีเมลล์และรหัสผ่าน")
    } else {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
        console.log(data)
        console.log("got some data", this.fire.auth.currentUser);
        this.alert("Success! You're logged in")
        this.checkStatus();

      }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          this.alert("Wrong password")
        } else {
          this.alert(error.message)
        }
        console.log(ErrorHandler)
      });

    }
  }

  goRegisterPage() {
    this.navCtrl.push("RegisterPage");
  }

  checkStatus() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        if(this.email == "admin@hotmail.com" && this.password=="67898704"){
          this.navCtrl.setRoot("MemberPage")
        }
        else if (user.displayName == "member") {
          this.navCtrl.setRoot("Home");
        } else if (user.displayName == "admin") {
          this.navCtrl.setRoot("AdminPage");
        } /* else if (user.displayName == "staff") {
          this.navCtrl.setRoot("StaffPage");
        } */

        console.log("this user: " + user.displayName)
      } else {
        // No user is signed in.
      }
    });

  }



}
