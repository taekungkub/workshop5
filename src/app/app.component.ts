import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "IntrolPage";

  pages: Array<{title: string, component: any,icon: String }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'หน้าแรก',icon: 'md-home', component: "Home" },
      { title: 'เข้าสู่ระบบ',icon: 'md-hand', component: "LoginPage" },
      { title: 'เกี่ยวกับเทศบาล',icon: 'document', component: "AboutPage" },
      { title: 'ติดต่อ',icon: 'md-contact', component: "ContactPage" },
      { title: 'ข้อเสนอแนะ',icon: 'md-help', component: "SuggestionPage" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#49B1B0');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
