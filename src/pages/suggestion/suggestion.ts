import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController ,LoadingController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {


  itemSuggestion: Observable<any[]>;

  Student: any;
  student: Student = new Student();

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private alertCtrl:AlertController, public loadingCtrl: LoadingController,private db: AngularFireDatabase,) {

 
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
  
 
  

    showAlert() {
      const alert = this.alertCtrl.create({
        title: '',
        subTitle: 'ข้อความของท่านถูกส่งแล้ว!',
        buttons: ['ตกลง']
      });
      alert.present();
    }

    sendData(){
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'กรุณากรอกชื่อ/อีเมลล์/เบอร์โทรศัพท หรือ ข้อเสนอแนะ',
        buttons: ['ตกลง']
      });
    
    if(this.student.name ==""){
      alert.present();
    }
      else if (this.student.email == "") {
      alert.present();
      }
      else if (this.student.tel == "") {
        alert.present(); 
      }
      else if (this.student.desc == "") {
      alert.present();
      }
      else if (this.student.title == "") {
        alert.present();
        }
      else {
      let itemRef = this.db.list(`suggestion`);
      itemRef.push(this.student);
     
        let loading = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Please wait...',
          duration: 500
        });
  
        loading.present().then(() => {
          this.showAlert();
        })

    }

   
      //reset
      this.student.name=""
      this.student.email=""
      this.student.tel=""
      this.student.title=""
      this.student.desc=""

    } //sendData
} //class

class Student {
  name=""
  email=""
  tel=""
  title=""
  desc=""

  timestamp = Date.now();

}