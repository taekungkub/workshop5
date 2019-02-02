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
  title:string;
  name:string;
  time:string;
  call:string;
  desc:string;
  address:string;
  track:string;
  imageURL:string;
  imageURL2:string;
  imageURL3:string;
  imageURL4:string;
  
  constructor(public navCtrl: NavController, public params: NavParams, public loadingCtrl: LoadingController) {
     // this.items = db.list('/wat').valueChanges();
   let loading = this.loadingCtrl.create({
    spinner: 'circles',
    content: 'Please wait...'

   });
   loading.present().then(()=>{ 
     this.title = this.params.get("title")
     this.name = this.params.get("name")
     this.time = this.params.get("time")
     this.call = this.params.get("call")
     this.address = this.params.get("address")
     this.desc = this.params.get("desc")
     this.track = this.params.get("track")

     this.imageURL = this.params.get("imageURL")
     this.imageURL2 = this.params.get("imageURL2")
     this.imageURL3 = this.params.get("imageURL3")
     this.imageURL4 = this.params.get("imageURL4")
     
     console.log(this.title)
   })
   loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatdetailsPage');
    console.log(this.title)
  }

}
