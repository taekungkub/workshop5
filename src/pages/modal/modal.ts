import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

      fullname:string
      email:string
      photoURL:string
      status:string


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController) {
     

      this.fullname = this.navParams.get("fullname")
      this.email = this.navParams.get("email")
      this.photoURL = this.navParams.get("photoURL")
     
      this.status = this.navParams.get("status")


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closemodal(){
    this.view.dismiss();
  }

 

}
