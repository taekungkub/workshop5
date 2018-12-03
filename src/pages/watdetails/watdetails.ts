import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the WatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-watdetails',
  templateUrl: 'watdetails.html',
})
export class WatdetailsPage {
  item;
  constructor(public navCtrl: NavController, public params: NavParams, public loadingCtrl: LoadingController) {
     // this.items = db.list('/wat').valueChanges();
   let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'Please wait...'

   });
   loading.present().then(()=>{ 
    this.item = params.data.item;
   })
   loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatdetailsPage');
  }

}
