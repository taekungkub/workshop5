import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HomePage } from '../home/home';
import { UserPage } from '../user/user';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {




  facebook;

  constructor(public navCtrl: NavController, public navParams: NavParams,  params: NavParams) {
    this.facebook = params.data.facebook;
  }

  tab1Root: any = HomePage;
  tab2Root = UserPage;
  
  dashboardParams: any = {
    facebook: this.navParams.get('facebook')
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
