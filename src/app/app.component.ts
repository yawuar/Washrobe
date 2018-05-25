import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { LaundryPage } from '../pages/laundry/laundry';
import { CalendarPage } from '../pages/calendar/calendar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = IntroPage;
  activePage: any;

  pages: Array<{ title: string, component: any, image: string, width: Number }>;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Wardrobe', component: HomePage, image: 'assets/imgs/wardrobe', width: 25 },
      { title: 'Laundry', component: LaundryPage, image: 'assets/imgs/laundry', width: 30 },
      { title: 'Calendar', component: CalendarPage, image: 'assets/imgs/calendar', width: 25 },
    ];

    this.activePage = this.pages[0];
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
    this.nav.setRoot(page.component, { data: JSON.parse(localStorage.getItem('currentUser'))['token'] });
    this.activePage = page;
  }

  checkActive(page) {
    return page === this.activePage;
  }
}

