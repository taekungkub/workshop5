import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


import * as firebase from "firebase";
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private fire: AngularFireAuth, private alertCtrl: AlertController, private toastCtrl: ToastController
    , public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  fullname: string
  email: string
  password: string;
  CFpassword:string;



  alert(message: string) {
    this.alertCtrl.create({
      title: message,
      subTitle: "",
      buttons: ['OK']
    }).present();

  }

  register() {
    if (this.fullname == null) {
      this.alert("กรุณากรอกชื่อและนามสกุล")
    } else if (this.email == null) {
      this.alert("กรุณากรอกอีเมลล์")
    } else if (this.password == null) {
      this.alert("กรุณากรอกรหัสผ่าน")
    } else if(this.password !== this.CFpassword) {
      this.alert("กรุณากรอกรหัสผ่านให้ตรงกัน")
    } else {
      this.signUp();
    }
  }

  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(data => {
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...'

      });
      loading.present().then(() => {
        let itemRef = this.db.list('user');
        itemRef.push({
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          CFpassword: this.CFpassword,
          photoURL:"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
          status: "member",
        })

        console.log("Insert Success")
        this.updataMember();
        this.alert("Success! You're registration")
        this.navCtrl.setRoot("LoginPage")

        //reset
        this.fullname = "";
        this.email = "";
        this.password = "";
        this.CFpassword ="";
      })
      loading.dismiss();

    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        this.alert("รหัสผ่านอย่างน้อยต้อง 6 ตัวขึ้นไป")
      } else {
        this.alert(errorMessage)
      }
      console.log(error)

    });


 
  } //signUp

  updataMember() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "member",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

cancel(){
  //reset
  this.fullname = "";
  this.email = "";
  this.password = "";
  this.CFpassword ="";
  this.navCtrl.setRoot("LoginPage")

}

}
