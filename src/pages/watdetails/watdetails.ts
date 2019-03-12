import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase  } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


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
  key:string;

  commentText:string;

  imageURL:string;
  imageURL2:string;
  imageURL3:string;
  imageURL4:string;

  itemsWat: Observable<any[]>;
  
  constructor(public navCtrl: NavController, public params: NavParams, public loadingCtrl: LoadingController,
    private db: AngularFireDatabase, private storage: AngularFireStorage) {
     
      this.itemsWat = db.list(`/wat/`)
      .valueChanges()

      console.log(this.itemsWat)

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

     this.key = this.params.get("key")

     this.commentText = this.params.get("comment")

     this.imageURL = this.params.get("imageURL")
     this.imageURL2 = this.params.get("imageURL2")
     this.imageURL3 = this.params.get("imageURL3")
     this.imageURL4 = this.params.get("imageURL4")
     console.log("Key: "+ this.key)
 
   })
   loading.dismiss();
  }

  ionViewDidLoad() {
  
  
  }

  Student: any;
  student: Student = new Student();

  comment(){

    let itemRef = this.db.list(`wat/${this.key}/comment`);
    itemRef.push(this.student);
    console.log(this.student)
    //reset
    this.student.comment = ""
  }

}

class Student {
  comment = "";
}
