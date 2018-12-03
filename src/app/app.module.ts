import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { WatPage } from '../pages/wat/wat';
import { WatdetailsPage } from '../pages/watdetails/watdetails';

import { VolunteerPage } from '../pages/volunteer/volunteer';

import { AddPage } from '../pages/add/add';
import { ContactPage } from '../pages/contact/contact';
import { IntrolPage } from '../pages/introl/introl';
import { EditPage } from '../pages/edit/edit';
import { EditdetailsPage } from '../pages/editdetails/editdetails';
import { RegisterPage } from '../pages/register/register';
import { AdminPage } from '../pages/admin/admin';
import { MemberPage } from '../pages/member/member';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule , AngularFireDatabase , AngularFireList   } from 'angularfire2/database';






import { AngularFirestoreModule   } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';



import * as Firebase from 'Firebase';


var config = {
  apiKey: "AIzaSyAJTU6tNy7n4we9lSKYTmn15M7Ll90YXIU",
  authDomain: "login-a4abb.firebaseapp.com",
  databaseURL: "https://login-a4abb.firebaseio.com",
  projectId: "login-a4abb",
  storageBucket: "login-a4abb.appspot.com",
  messagingSenderId: "146704021773"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UserPage,
    TabsPage,
    WatPage,
    WatdetailsPage,
    IntrolPage,
    AddPage,
    ContactPage,
    VolunteerPage,
    EditPage,
    EditdetailsPage,
    RegisterPage,
    AdminPage,
    MemberPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    UserPage,
    TabsPage,
    WatPage,
    WatdetailsPage,
    IntrolPage,
    AddPage,
    ContactPage,
    VolunteerPage,
    EditPage,
    EditdetailsPage,
    RegisterPage,
    AdminPage,
    MemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
