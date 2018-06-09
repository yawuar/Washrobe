import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  Nav,
  ToastController,
  LoadingController
} from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { IntroPage } from "../pages/intro/intro";
import { HomePage } from "../pages/home/home";
import { LaundryPage } from "../pages/laundry/laundry";
import { CalendarPage } from "../pages/calendar/calendar";
import { LoginPage } from "../pages/login/login";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = IntroPage;
  activePage: any;

  public loading: any;

  pages: Array<{ title: string; component: any; image: string; width: Number }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private authServiceProvider: AuthServiceProvider,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.pages = [
      {
        title: "Wardrobe",
        component: HomePage,
        image: "assets/imgs/wardrobe",
        width: 25
      },
      {
        title: "Laundry",
        component: LaundryPage,
        image: "assets/imgs/laundry",
        width: 30
      },
      {
        title: "Calendar",
        component: CalendarPage,
        image: "assets/imgs/calendar",
        width: 25
      }
    ];

    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (this.platform.is("ios")) {
        this.keyboard.disableScroll(true);
      }
      this.statusBar.overlaysWebView(false);

      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page === this.activePage;
  }

  logout() {
    this.showLoader();
    this.authServiceProvider
      .logout(localStorage.getItem("currentUser"), "logout")
      .then(result => {
        this.loading.dismiss();
        this.nav.setRoot(LoginPage);
      })
      .catch(err => {
        this.loading.dismiss();
        this.presentToast(err);
      });
  }

  showLoader() {
    this.loading = this.loadingController.create({
      content: "Logging out..."
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
