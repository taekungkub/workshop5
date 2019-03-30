import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController ,LoadingController} from 'ionic-angular';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";




@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  email:string;
  photoURL:string;
  displayName:string;


  
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth
            , private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
              let loading = this.loadingCtrl.create({
                spinner: 'circles',
                content: 'Please wait...',
              });
              loading.present().then(() => {
             
            
    this.email = fire.auth.currentUser.email;
    this.photoURL = fire.auth.currentUser.photoURL;
    this.displayName = fire.auth.currentUser.displayName;

  

    loading.dismiss();
  }) //loadin
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: message,
      subTitle: '',
      buttons: ['OK']
    }).present();

  }

  goHomePage(){
    this.navCtrl.push("Home");
  }
  goEditPage(){
    this.navCtrl.push("EditPage");
  }

  
 /* LogoutOfFacebook() {
    this.fire.auth.signOut();
    this.facebook.loggedin = false;
    this.navCtrl.setRoot(HomePage)
  } */

  goAddPage(){
    this.navCtrl.push("AddPage");
  }

  Logout(){
    firebase.auth().signOut().then((result)=> {
      this.alert("ออกจากระบบเรียบร้อย")
      this.navCtrl.setRoot("LoginPage")
    }).catch(function(error) {
      // An error happened.
    });
 
  }

  ViewSuggestion(){
    this.navCtrl.push("ViewSuggestionPage");

  }

  manageUser(){
    this.navCtrl.push("ManageUserPage");
  }


  ViewUser(){
    this.navCtrl.push("UserPage");
  }

  

}
