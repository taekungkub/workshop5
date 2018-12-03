import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the EditdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editdetails',
  templateUrl: 'editdetails.html',
})
export class EditdetailsPage {


  item;

  student: any = {
    title : "",
    name : "",
  }

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public params: NavParams,private db: AngularFireDatabase,) {
    this.item = params.data.item;

    this.items = db.list('/wat', ref => ref.orderByChild('title'))
    .snapshotChanges().map(result => {
      return result.reverse();
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditdetailsPage');

  }


  update(item) {
    let itemRef = this.db.list('wat');
    itemRef.update(item.key,this.student)
  }

}



