import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


import { AddPage } from '../add/add';
import { EditdetailsPage } from '../editdetails/editdetails';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  Student: any;
  student: Student = new Student();

  itemsWat: Observable<any[]>;
  itemsVolunteer: Observable<any[]>;

  AddForm = false;
  updateWatBTN = false;
  updateVolunteerBTN = false




  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private storage: AngularFireStorage, private alertCtrl: AlertController, private toastCtrl: ToastController
    , public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please wait...',
    });
    loading.present().then(() => {
      this.itemsWat = db.list('/wat', ref => ref.orderByChild('title'))
        .snapshotChanges().map(result => {
          return result.reverse();
        })

      this.itemsVolunteer = db.list('/volunteer', ref => ref.orderByChild('title'))
        .snapshotChanges().map(result => {
          return result.reverse();
        })
      loading.dismiss();
    }) //loading
  } //constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  toast2(message: string) {
    this.toastCtrl.create({
      message: 'คุณได้ทำการลบ ' + this.student.title + ' สำเร็จแล้ว',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  onClickDelete(item) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'คุณต้องการจะลบหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Comfirm delete');

            console.log("key" + JSON.stringify(item));
            let itemRef = this.db.list('wat');
            itemRef.remove(item.key);
            if (this.student.imageName) {
              var desertRef = this.storage.ref(item.payload.val().imageName);
              desertRef.delete().subscribe(() => {
                console.log("deleted")
              })

            }
            this.toast2("")
          }
        }
      ]
    });
    alert.present();
  }//onClickDeleteWat

  onClickDeleteVolunteer(item) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      message: 'คุณต้องการจะลบหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'ยกเลิก',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Comfirm delete');

            console.log("key" + JSON.stringify(item));
            let itemRef = this.db.list('volunteer');
            itemRef.remove(item.key);
            if (this.student.imageName) {
              var desertRef = this.storage.ref(item.payload.val().imageName);
              desertRef.delete().subscribe(() => {
                console.log("deleted")
              })
            }
            this.toast2("")
          }
        }
      ]
    });
    alert.present();
  }//onClickDeleteVolunteer

  goEditDetailsPage(item) {
    this.navCtrl.push(EditdetailsPage, { item: item });
    console.log("Item Key" + this.student.title)
  }

  editWat(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.AddForm = true;
    this.updateWatBTN = true;
    this.updateVolunteerBTN = false;

    console.log(item.key)
  }

  editVolunteer(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.AddForm = true;
    this.updateVolunteerBTN = true;
    this.updateWatBTN = false;

    console.log(item.key)
  }


  toast(message: string) {
    this.toastCtrl.create({
      message: 'คุณได้ทำการแก้ไข ' + this.student.title + ' สำเร็จแล้ว',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  updateWat(item) {
    let itemRef = this.db.list('wat');
    itemRef.update(this.student.key, this.student);
    this.AddForm = false;

    this.toast("")

  } //updateWat

  updateVolunteer(item) {
    let itemRef = this.db.list('volunteer');
    itemRef.update(this.student.key, this.student);

    this.AddForm = false;
    this.toast("")

  } //updateVolunteer

  dismissUpdate() {
    this.AddForm = false;
  }



} //class

class Student {
  type = "Default"
  key = "";
  title = "";
  name = "";
  time = "";
  call = "";
  desc = "";
  track = "";
  imageName = "";
  imageURL = "";

  imageName2 = "";
  imageURL2 = "";

  imageName3 = "";
  imageURL3 = "";

  timestamp = Date.now();
}






