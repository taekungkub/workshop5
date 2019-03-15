import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { timestamp } from 'rxjs/operators';



@IonicPage()
@Component({
  selector: 'page-view-suggestion-modal',
  templateUrl: 'view-suggestion-modal.html',
})
export class ViewSuggestionModalPage {

  name:string
  email:string
  tel:string
  title:string
  desc:string
  timestamp:string

  constructor(public navCtrl: NavController, public navParams: NavParams,private view:ViewController) {

    this.name = this.navParams.get("name")
    this.email = this.navParams.get("email")
    this.tel = this.navParams.get("tel")
   
    this.title = this.navParams.get("title")
    this.desc = this.navParams.get("desc")
    this.timestamp = this.navParams.get("timestamp")
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSuggestionModalPage');
  }

  closemodal(){
    this.view.dismiss();
  }

  

}
