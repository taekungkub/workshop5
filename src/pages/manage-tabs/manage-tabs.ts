import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManageTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-tabs',
  templateUrl: 'manage-tabs.html',
})
export class ManageTabsPage {

  tab1: any;
  tab2: any;
 


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = "ManageUserPage";
    this.tab2 = "ManageStaffPage";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageTabsPage');
  }



}
