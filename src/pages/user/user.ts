import { Component , ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from "firebase";
import { AngularFireAuthModule , AngularFireAuth  } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {


  facebook;


  constructor(public navCtrl: NavController, public navParams: NavParams,  params: NavParams , private fire:AngularFireAuth ,) {
    this.facebook = params.data.facebook;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    console.log(this.facebook)
  }

  LogoutOfFacebook() {
    this.navCtrl.push(LoginPage)
  }


  

}
