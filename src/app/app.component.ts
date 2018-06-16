import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  Nav,
  ToastController,
  LoadingController,
  Events
} from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";

import { IntroPage } from "../pages/intro/intro";
import { HomePage } from "../pages/home/home";
import { LaundryPage } from "../pages/laundry/laundry";
import { CalendarPage } from "../pages/calendar/calendar";
import { LoginPage } from "../pages/login/login";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { NetworkServiceProvider } from "../providers/network-service/network-service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = IntroPage;
  activePage: any;

  public loading: any;
  public name: string = "";

  pages: Array<{ title: string; component: any; image: string; width: Number }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private keyboard: Keyboard,
    private authServiceProvider: AuthServiceProvider,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private events: Events,
    private network: Network,
    private networkServiceProvider: NetworkServiceProvider
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
      this.networkServiceProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe("network:offline", () => {
        this.displayNetworkUpdate("offline");
      });

      // Online event
      this.events.subscribe("network:online", () => {
        this.displayNetworkUpdate("online");
      });

      this.statusBar.styleDefault();
      this.keyboard.disableScroll(false);

      this.statusBar.overlaysWebView(false);

      this.splashScreen.hide();

      this.name = JSON.parse(localStorage.getItem("currentUser"))["firstname"];
    });
  }

  displayNetworkUpdate(state: string) {
    let type = this.network.type;

    this.toastController
      .create({
        message: "You are now " + state + " via " + type,
        duration: 3000
      })
      .present();
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
