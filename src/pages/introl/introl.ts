import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';


/**
 * Generated class for the IntrolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introl',
  templateUrl: 'introl.html',
})
export class IntrolPage {


 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntolPage');


  }

  goHomePage(){
    this.navCtrl.setRoot("Home");
  }

  

}
