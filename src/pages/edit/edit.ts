import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Content } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { t } from '@angular/core/src/render3';




@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  @ViewChild(Content) content: Content;

  Student: any;
  student: Student = new Student();

  itemsWat: Observable<any[]>;
  itemsVolunteer: Observable<any[]>;
  itemsTravel: Observable<any[]>;
  itemsSport: Observable<any[]>;

  AddForm = false;
  updateWatBTN = false;
  updateVolunteerBTN = false
  updateTravelBTN = false
  updateSportBTN = false

  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]


  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private storage: AngularFireStorage, private alertCtrl: AlertController, private toastCtrl: ToastController
    , public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please wait...',
    });
    loading.present().then(() => {
      this.itemsWat = db.list('/wat', ref => ref.orderByChild('title'))
        .snapshotChanges()

      this.itemsVolunteer = db.list('/volunteer', ref => ref.orderByChild('title'))
        .snapshotChanges()

        this.itemsTravel = db.list('/travel', ref => ref.orderByChild('title'))
        .snapshotChanges()

        this.itemsSport = db.list('/sport', ref => ref.orderByChild('title'))
        .snapshotChanges()
        
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

  onClickDeleteTravel(item) {
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
            let itemRef = this.db.list('travel');
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


  onClickDeleteSport(item) {
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
            let itemRef = this.db.list('sport');
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
    this.navCtrl.push("EditdetailsPage", { item: item });
    console.log("Item Key" + this.student.title)
  }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  uploadPercent2: Observable<number>;
  downloadURL2: Observable<string>;

  uploadPercent3: Observable<number>;
  downloadURL3: Observable<string>;

  uploadPercent4: Observable<number>;
  downloadURL4: Observable<string>;
  
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


  editWat(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.address = item.payload.val().address;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.student.imageName4 = item.payload.val().imageName4;
    this.student.imageURL4 = item.payload.val().imageURL4;

    this.AddForm = true;
    this.updateWatBTN = true;
    this.updateVolunteerBTN = false;
    this.updateTravelBTN = false;
    this.updateSportBTN = false;

    this.content.scrollToTop();
  
    console.log("key: " + item.key + "Image: " + this.student.imageURL)

  }

  editVolunteer(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.address = item.payload.val().address;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.student.imageName4 = item.payload.val().imageName4;
    this.student.imageURL4 = item.payload.val().imageURL4;

    this.AddForm = true;
    this.updateVolunteerBTN = true;
    this.updateWatBTN = false;
    this.updateTravelBTN = false;
    this.updateSportBTN = false;

    this.content.scrollToTop();
    console.log(item.key)
  }

  editTravel(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.address = item.payload.val().address;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.student.imageName4 = item.payload.val().imageName4;
    this.student.imageURL4 = item.payload.val().imageURL4;

    this.AddForm = true;
    this.updateTravelBTN = true
    this.updateVolunteerBTN = false;
    this.updateWatBTN = false;
    this.updateSportBTN = false;
    
    this.content.scrollToTop();
  

    console.log(item.key)
  } //editTravel

  editSport(item) {

    this.student.key = item.key
    this.student.title = item.payload.val().title;
    this.student.name = item.payload.val().name;

    this.student.time = item.payload.val().time;
    this.student.call = item.payload.val().call;
    this.student.address = item.payload.val().address;
    this.student.desc = item.payload.val().desc;
    this.student.track = item.payload.val().track;

    //Image
    this.student.imageName = item.payload.val().imageName;
    this.student.imageURL = item.payload.val().imageURL;

    this.student.imageName2 = item.payload.val().imageName2;
    this.student.imageURL2 = item.payload.val().imageURL2;

    this.student.imageName3 = item.payload.val().imageName3;
    this.student.imageURL3 = item.payload.val().imageURL3;

    this.student.imageName4 = item.payload.val().imageName4;
    this.student.imageURL4 = item.payload.val().imageURL4;

    this.AddForm = true;
    this.updateSportBTN = true
    this.updateVolunteerBTN = false;
    this.updateWatBTN = false;
    this.updateTravelBTN = false
    
    this.content.scrollToTop();
  
    console.log(item.key)
  } //editSport



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
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please wait...',
    });
    loading.present().then(() => {
    let itemRef = this.db.list('volunteer');
    itemRef.update(this.student.key, this.student);
    loading.dismiss();
  }) //loading

    this.AddForm = false;
    this.toast("")

  } //updateVolunteer


  updateTravel(item) {
    let itemRef = this.db.list('travel');
    itemRef.update(this.student.key, this.student);

    this.AddForm = false;
    this.toast("")

  } //updateTravel

  updateSport(item) {
    let itemRef = this.db.list('sport');
    itemRef.update(this.student.key, this.student);

    this.AddForm = false;
    this.toast("")

  } //updateTravel

  dismissUpdate() {
    this.AddForm = false;
  }



} //class

class Student {

  key = "";
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
  imageURL3 = "";

  imageName4 = "";
  imageURL4 = "";

  timestamp = Date.now();
}






