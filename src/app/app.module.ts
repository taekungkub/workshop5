import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule , AngularFireDatabase , AngularFireList  ,  } from 'angularfire2/database';

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
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
