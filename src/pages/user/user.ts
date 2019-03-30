import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , AlertController 
  ,ToastController , LoadingController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


import { map } from 'rxjs/operators';



import * as firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {


  itemsUser: Observable<any[]>;

  itemsStaff: Observable<any[]>;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    private fire: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {

      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please wait...',
      });
      loading.present().then(() => {
        this.itemsUser = db.list('/user')
        .snapshotChanges()

        this.itemsStaff = db.list('/staff')
        .snapshotChanges()
    
        loading.dismiss();
      }) //loadin
 
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
         firebase.auth().signOut()
  }


  //member
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


  admin(item) {

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

            let loading = this.loadingCtrl.create({
              spinner: 'circles',
              content: 'Please wait...',
            });

        
            this.email = item.payload.val().email;
            this.password = item.payload.val().password;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
              var user = firebase.auth().currentUser;
             user.updateProfile({
               displayName: "staff",
               photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
             }).then(function () {
               console.log("this staff: " + user.displayName)
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

    let itemRef = this.db.list('staff');
    itemRef.update(item.key,{
      fullname:this.fullname,
      email:this.email,
      password:this.password,
      CFpassword:this.CFpassword,
      photoURL:"https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
      status:"เจ้าหน้าที่"
    })
    
    let itemRef2 = this.db.list('user');
    itemRef2.remove(item.key);

    loading.present().then(() => {
       
      loading.dismiss();
    }) //loadin

    this.alert("เปลี่ยนสถานะเรียบร้อยแล้ว")

  }
}
]
});
alert.present();
  } //admin

  //Staff

  fullname: string
  email: string
  password: string;
  CFpassword:string;
  photoURL: string
  status:string

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

  toast2(message: string) {
    this.toastCtrl.create({
      message: 'คุณได้ทำการลบ ' + this.fullname + ' สำเร็จแล้ว',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  
  alert(message: string) {
    this.alertCtrl.create({
      title: message,
      subTitle: '',
      buttons: ['OK']
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

            let loading = this.loadingCtrl.create({
              spinner: 'circles',
              content: 'Please wait...',
            });
            
           
            this.member(item);
            //delete in database real time
  
            let itemRef = this.db.list('staff');
            itemRef.remove(item.key);
            loading.present().then(() => {
              this.alert("ลบเจ้าหน้าที่ " + this.fullname + " เรียบร้อยแล้ว")
              this.toast2("")
              loading.dismiss();
            }) //loadin
          }
        }
      ]
    });
    
    alert.present();
  }

  member(item) {
    firebase.auth().signOut()
    this.email = item.payload.val().email;
    this.password = item.payload.val().password;
    this.fullname = item.payload.val().fullname;

    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
      firebase.auth().signOut()
     var user = firebase.auth().currentUser;
     firebase.auth().signOut()
     user.delete().then(function() {
     }).catch(function(error) {
       // An error happened.
     });
    })

  }//member

  //sec3

  updataAdmin() {
    var user = firebase.auth().currentUser
    user.updateProfile({
      displayName: "staff",
      photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55"
    }).then(function () {
      console.log("this staff: " + user.displayName)
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }


  AddForm = false;
  addAdmin(){
    //reset
    this.fullname =""
    this.email = ""
    this.password = ""
    this.CFpassword = ""
  
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
        let itemRef = this.db.list('staff');
        itemRef.push({
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          CFpassword: this.CFpassword,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/login-a4abb.appspot.com/o/user.png?alt=media&token=d3af7b88-71d2-46c7-9908-c658e92cab55",
          status: "เจ้าหน้าที่",
        })
  
        console.log("Insert Success")
        this.updataAdmin();
        this.alert("Success! You're registration")

        //reset
        this.fullname = "";
        this.email = "";
        this.password = "";
        this.CFpassword = "";
        this.AddForm = false;
       

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


}
