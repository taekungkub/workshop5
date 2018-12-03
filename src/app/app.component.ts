import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { WatdetailsPage } from '../pages/watdetails/watdetails';

import { IntrolPage } from '../pages/introl/introl';
import { AddPage } from '../pages/add/add';
import { EditPage } from '../pages/edit/edit';
import { RegisterPage } from '../pages/register/register';
import { AdminPage } from '../pages/admin/admin';
import { MemberPage } from '../pages/member/member';

import { UserPage } from '../pages/user/user';
import { ContactPage } from '../pages/contact/contact';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon: String }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'md-home', component: HomePage },
      { title: 'เข้าสู่ระบบ',icon: 'md-hand', component: LoginPage },
      { title: 'เพิ่มข้อมูล',icon: 'md-add', component: AddPage },
      { title: 'ติดต่อ',icon: 'md-contact', component: ContactPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
