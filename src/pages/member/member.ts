import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController
  , LoadingController, ToastController , ModalController} from 'ionic-angular';


import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { map } from 'rxjs/operators';



import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  term: string;
  
  itemsUser: Observable<any[]>;

  itemsAdmin: Observable<any[]>;
  displayName:string;
  emailAdmin:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase
    , private alertCtrl: AlertController, public loadingCtrl: LoadingController, private toastCtrl: ToastController
    ,private fire: AngularFireAuth,public modalController: ModalController) {

    this.itemsUser = db.list('/user')
      .snapshotChanges()

    this.itemsAdmin = db.list('/admin')
      .snapshotChanges()

    this.emailAdmin = fire.auth.currentUser.email;

    this.photoURL = fire.auth.currentUser.photoURL;
    this.displayName = fire.auth.currentUser.displayName;
  } //constructor



  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }


  alert(message: string) {
    this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    }).present();

  }

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

    
    let itemRef = this.db.list('user');
    itemRef.update(item.key, { "status": "member" });
    console.log("Status " + this.displayName)
    this.alert("เปลี่ยนสถานะเรียบร้อยแล้ว")
  }//member

  admin(item) {
    this.email = item.payload.val().email;
    this.password = item.payload.val().password;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
     var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "admin",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      console.log("this admin: " + user.displayName)
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    }); 
    })

    //update realtime admin
    this.fullname = item.payload.val().fullname;
    this.email = item.payload.val().email;
    this.password = item.payload.val().password;
    this.CFpassword = item.payload.val().CFpassword;

    let itemRef = this.db.list('admin');
    itemRef.update(item.key,{
      fullname:this.fullname,
      email:this.email,
      password:this.password,
      CFpassword:this.CFpassword,
      photoURL:"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
      status:"admin"
    })
    
    let itemRef2 = this.db.list('user');
    itemRef2.remove(item.key);


    console.log("Status " + this.displayName)
    this.alert("เปลี่ยนสถานะเรียบร้อยแล้ว")
  } //admin



  fullname: string
  email: string
  password: string;
  CFpassword:string;
  photoURL: string
  status:string

  registerAdmin() {
    if (this.fullname == null) {
      this.alert("กรุณากรอกชื่อและนามสกุล")
    } else if (this.email == null) {
      this.alert("กรุณากรอกอีเมลล์")
    } else if (this.password == null) {
      this.alert("กรุณากรอกรหัสผ่าน")
    }else if(this.password !== this.CFpassword) {
      this.alert("กรุณากรอกรหัสผ่านให้ตรงกัน")
    } else {

      this.signUpAdmin();
    }
  }//register

  signUpAdmin() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(data => {
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...'

      });
      loading.present().then(() => {
        let itemRef = this.db.list('admin');
        itemRef.push({
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          CFpassword: this.CFpassword,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
          status: "admin",
        })
  
        console.log("Insert Success")
        this.updataAdmin();
        this.alert("Success! You're registration")

        //reset
        this.fullname = "";
        this.email = "";
        this.password = "";
        this.CFpassword = "";

      })
      loading.dismiss();

    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        this.alert("รหัสผ่านอย่างน้อยต้อง 6 ตัวขึ้นไป")
      } else {
        this.alert(errorMessage)
      }
      console.log(error)

    });


  } //signUpAdmin

  updataAdmin() {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "admin",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      console.log("this admin: " + user.displayName)
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  toast2(message: string) {
    this.toastCtrl.create({
      message: 'คุณได้ทำการลบ ' + this.fullname + ' สำเร็จแล้ว',
      duration: 3000,
      position: 'bottom'
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
            //delete in database real time
            let itemRef = this.db.list('admin');
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
    }).then(()=>{
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: "member",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
      }).then(function () {
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
    })
    this.toast2("")

  } //updateWat


  Logout(){
    firebase.auth().signOut().then((result)=> {
      this.alert("ออกจากระบบเรียบร้อย")
      this.navCtrl.setRoot("LoginPage")
    }).catch(function(error) {
      // An error happened.
    });
  }

  

  AddForm = false;
  addAdmin(){
  
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please wait...',
    });
    loading.present().then(() => {
      this.AddForm = true;
      loading.dismiss();
    }) //loadin
  }
  hide(){
    this.AddForm = false;
  }

   presentModal(item) {
    let data = {
      fullname : item.payload.val().fullname,
      email : item.payload.val().email,
      status : item.payload.val().status,
      photoURL : item.payload.val().photoURL,
      }
    const modal = this.modalController.create('ModalPage',data)
    console.log(this.fullname + this.email + this. photoURL + this.status)
    
    modal.present();
  }


}