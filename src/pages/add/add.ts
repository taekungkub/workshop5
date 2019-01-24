import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  Student: any;
  student: Student = new Student();
  type: string;

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  uploadPercent: Observable<number>;
  uploadPercent2: Observable<number>;
  uploadPercent3: Observable<number>;
  uploadPercent4: Observable<number>;

  downloadURL: Observable<string>;
  downloadURL2: Observable<string>;
  downloadURL3: Observable<string>;
  downloadURL4: Observable<string>;
  //Download URL
  isUploaded: boolean = false;
  items: Observable<any[]>;






  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, 
              private storage: AngularFireStorage,private alertCtrl: AlertController) {

    this.items = db.list('/wat', ref => ref.orderByChild('title'))
      .snapshotChanges().map(result => {
        return result.reverse();
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  onClickSubmit() {

    if (this.student.type == "wat") {
       if(this.student.title == "" && this.student.name == ""){
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'กรุณากรอกชื่อสถานที่และเขต/อำเภอ',
          buttons: ['Dismiss']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'เพิ่มข้อมูลสำเร็จแล้ว',
          buttons: ['OK']
        });
        alert.present();
        let itemRef = this.db.list('wat');
        itemRef.push(this.student)
        this.navCtrl.push("WatPage");
      }
 
    } else if (this.student.type == "volunteer") {
      if(this.student.title == "" && this.student.name == ""){
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'กรุณากรอกชื่อสถานที่และเขต/อำเภอ',
          buttons: ['Dismiss']
        });
        alert.present();
      } else { 
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'เพิ่มข้อมูลสำเร็จแล้ว',
          buttons: ['OK']
        });
        alert.present();
        let itemRef = this.db.list('volunteer');
        itemRef.push(this.student)
        this.navCtrl.push("VolunteerPage");
        }
      } else if (this.student.type == "travel") {
        if(this.student.title == "" && this.student.name == ""){
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'กรุณากรอกชื่อสถานที่และเขต/อำเภอ',
            buttons: ['Dismiss']
          });
          alert.present();
        } else { 
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'เพิ่มข้อมูลสำเร็จแล้ว',
            buttons: ['OK']
          });
          alert.present();
          let itemRef = this.db.list('travel');
          itemRef.push(this.student)
          this.navCtrl.push("TravelPage");
          }
        }


      else if (this.student.type == "Default") {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'กรุณาเลือกประเภท',
          buttons: ['Dismiss']
        });
        alert.present();
      }

    

    //reset
    this.isUploaded = false;

    this.student.title = "";
    this.student.name = "";
    this.student.time = "";
    this.student.call = "";
    this.student.address = "";
    this.student.desc = "";
    this.student.track = "";

    this.student.imageName = "";
    this.student.imageURL = "";

    this.student.imageName2 = "";
    this.student.imageURL2 = "";

    this.student.imageName3 = "";
    this.student.imageURL3 = "";

    this.student.imageName4 = "";
    this.student.imageURL4 = "";

  } //onClickSubmit

  onClickDelete(item) {
    console.log("key" + JSON.stringify(item));
    let itemRef = this.db.list('student');
    itemRef.remove(item.key);
    if (this.student.imageName) {
      var desertRef = this.storage.ref(item.payload.val().imageName);
      desertRef.delete().subscribe(() => {
        console.log("deleted")
      })
    }

  } //onClickDelete

  uploadFile(event) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }
    const filePath = `wat/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe((url) => {
          this.student.imageURL = url
          this.student.imageName = filePath
        });
      })
    )
      .subscribe();
  } //Upload File

  
  uploadFile2(event) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }
    const filePath = `wat/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    this.uploadPercent2 = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL2 = fileRef.getDownloadURL()
        this.downloadURL2.subscribe((url) => {
          this.student.imageURL2 = url
          this.student.imageName2 = filePath
        });
      })
    )
      .subscribe();
  } //Upload File2

  uploadFile3(event) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }
    const filePath = `wat/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    this.uploadPercent3 = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL3 = fileRef.getDownloadURL()
        this.downloadURL3.subscribe((url) => {
          this.student.imageURL3 = url
          this.student.imageName3 = filePath
        });
      })
    )
      .subscribe();
  } //Upload File3

  uploadFile4(event) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return
    }
    const filePath = `wat/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    this.uploadPercent4 = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL4 = fileRef.getDownloadURL()
        this.downloadURL4.subscribe((url) => {
          this.student.imageURL4 = url
          this.student.imageName4 = filePath
        });
      })
    )
      .subscribe();
  } //Upload File4



} //class

class Student {
  type = "Default"
  title = "";
  name = "";
  time = "";
  call = "";
  address = "";
  desc = "";
  track = "";
  imageName = "";
  imageURL = "";

  imageName2 = "";
  imageURL2 = "";

  imageName3 = "";
  imageURL3= "";

  imageName4 = "";
  imageURL4= "";

  timestamp = Date.now();
}

