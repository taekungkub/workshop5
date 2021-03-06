import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , AlertController ,ToastController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { map } from 'rxjs/operators';



import * as firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-manage-user',
  templateUrl: 'manage-user.html',
})
export class ManageUserPage {

  itemsUser: Observable<any[]>;
  itemsStaff: Observable<any[]>;

  fullname: string
  email: string
  password: string;
  CFpassword:string;
  photoURL: string
  status:string

  displayName:string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private db: AngularFireDatabase,
              public modalController: ModalController,
              public alertCtrl: AlertController,
              private fire: AngularFireAuth,
              private toastCtrl: ToastController) {


    
    this.itemsUser = db.list('/user')
    .snapshotChanges()

    this.itemsStaff = db.list('/staff')
    .snapshotChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageUserPage');
  }


    //Manage Staff
    toast2(message: string) {
      this.toastCtrl.create({
        message: 'คุณได้ทำการลบ ' + this.fullname + ' สำเร็จแล้ว',
        duration: 3000,
        position: 'top'
      }).present();
    }
  
    deleteAdmin(item) {
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
  
              //เปลี่ยนเป็นสมาชิก
              this.updateMember(item);
              this.member(item);
              this.alert("เปลี่ยนสถานะเป็น member เรียบร้อยแล้ว")
              //delete in database real time
              let itemRef = this.db.list('staff');
              itemRef.remove(item.key);
  
          
              this.toast2("")
            }
          }
        ]
      });
      alert.present();
    }
  
    updateMember(item) {
      this.fullname = item.payload.val().fullname;
      this.email = item.payload.val().email;
      this.password = item.payload.val().password;
      this.CFpassword = item.payload.val().CFpassword;
  
      let itemRef = this.db.list('user');
      itemRef.update(item.key,{
        fullname:this.fullname,
        email:this.email,
        password:this.password,
        CFpassword:this.CFpassword,
        photoURL:"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
        status:"member"
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
    } //updateadmin
  
    member(item) {
      this.email = item.payload.val().email;
      this.password = item.payload.val().password;
  
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
       var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: "member",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
      }).then(function () {
        console.log("this member: " + user.displayName)
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      }); 
      })
    }//member
  
    ViewDataStaff(item){
  
      let data = {
        fullname : item.payload.val().fullname,
        email : item.payload.val().email,
        status : item.payload.val().status,
        photoURL : item.payload.val().photoURL,
        }
      const modal = this.modalController.create('ModalPage',data)
      modal.present();
    }
  






   //Manage User 
  ViewDataUser(item){

    let data = {
      fullname : item.payload.val().fullname,
      email : item.payload.val().email,
      status : item.payload.val().status,
      photoURL : item.payload.val().photoURL,
      }
    const modal = this.modalController.create('ModalPage',data)
    modal.present();
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: message,
      subTitle: '',
      buttons: ['OK']
    }).present();

  }

  admin(item) {
    this.email = item.payload.val().email;
    this.password = item.payload.val().password;

    let alert = this.alertCtrl.create({
      title: 'ยืนยันการเปลี่ยนสิทธิ์',
      message: 'คุณต้องการที่จะเปลี่ยนสิทธิ์หรือไม่ ?',
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

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
     var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "staff",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      console.log("this status: " + user.displayName)
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    }); 


    //update realtime admin
    this.fullname = item.payload.val().fullname;
    this.email = item.payload.val().email;
    this.password = item.payload.val().password;
    this.CFpassword = item.payload.val().CFpassword;

    let itemRef = this.db.list('staff');
    itemRef.update(item.key,{
      fullname:this.fullname,
      email:this.email,
      password:this.password,
      CFpassword:this.CFpassword,
      photoURL:"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
      status:"staff"
    })
  })
    
    let itemRef2 = this.db.list('user');
    itemRef2.remove(item.key);


    console.log("Status " + this.displayName)
    this.alert("เปลี่ยนสถานะเป็น Staff เรียบร้อยแล้ว")
  }
}
]
});
alert.present();
  } //admin


} //class