import { Component } from '@angular/core';
import { NavController , NavParams , LoadingController} from 'ionic-angular';

import { AngularFireDatabaseModule , AngularFireDatabase, AngularFireList     } from 'angularfire2/database';



import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WatPage } from '../wat/wat';
import { VolunteerPage } from '../volunteer/volunteer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,  params: NavParams 
            ,public db: AngularFireDatabase, public loadingCtrl: LoadingController) {

    this.itemsRef = db.list('like')
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log(this.items)
 

    } //constructor

    goWatPage(){
      this.navCtrl.push(WatPage);
        let itemRef = this.db.list('like');
    }
    goVolunteerPage(){
      this.navCtrl.push(VolunteerPage);
    }



  } //class

  

  

   


