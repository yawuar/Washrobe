import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { HTTP } from "@ionic-native/http";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IntroPage } from "../pages/intro/intro";
import { LoginPage } from "../pages/login/login";
import { ItemPage } from "../pages/item/item";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { HttpClientModule } from "@angular/common/http";

import { CustomHeaderComponent } from "../components/custom-header/custom-header";
import { WardrobeServiceProvider } from "../providers/wardrobe-service/wardrobe-service";
import { RegistrationPage } from "../pages/registration/registration";
import { ScanPage } from "../pages/scan/scan";
import { NFC, Ndef } from "@ionic-native/nfc";
import { ItemServiceProvider } from "../providers/item-service/item-service";
import { LaundryPage } from "../pages/laundry/laundry";
import { CalendarPage } from "../pages/calendar/calendar";
import { LaundryServiceProvider } from "../providers/laundry-service/laundry-service";

import { IonicImageLoader } from "ionic-image-loader";
import { LaundryItemPage } from "../pages/laundry-item/laundry-item";
import { WashingPage } from "../pages/washing/washing";

import { KeysPipe } from "../pipes/keys/keys";
import { GetItemPipe } from "../pipes/get-item/get-item";
import { WashingTypePage } from "../pages/washing-type/washing-type";
import { WashingDegreePage } from "../pages/washing-degree/washing-degree";
import { WashingMaterialPage } from "../pages/washing-material/washing-material";
import { MapsPage } from "../pages/maps/maps";

import { GoogleMaps } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";
import { CoinwashServiceProvider } from "../providers/coinwash-service/coinwash-service";

import { GooglePlus } from "@ionic-native/google-plus";
import { AngularFireModule } from "angularfire2";
import Firebase from "firebase";
import { CalendarServiceProvider } from "../providers/calendar-service/calendar-service";

import { NgxMasonryModule } from 'ngx-masonry';
import { CalendarComponent } from "../components/calendar/calendar";
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Network } from "@ionic-native/network";

export const firebaseConfig = {
  apiKey: "AIzaSyBAG-Ddq3A0d4e275HeYMnrMFm5oouFHrU",
  authDomain: "washrobe-206413.firebaseapp.com",
  databaseURL: "https://washrobe-206413.firebaseio.com",
  projectId: "washrobe-206413",
  storageBucket: "washrobe-206413.appspot.com",
  messagingSenderId: "842173039607"
};
Firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    ItemPage,
    CustomHeaderComponent,
    RegistrationPage,
    ScanPage,
    LaundryPage,
    CalendarPage,
    LaundryItemPage,
    WashingPage,
    KeysPipe,
    GetItemPipe,
    WashingTypePage,
    WashingDegreePage,
    WashingMaterialPage,
    MapsPage,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    IonicImageLoader.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgxMasonryModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    ItemPage,
    RegistrationPage,
    ScanPage,
    LaundryPage,
    CalendarPage,
    LaundryItemPage,
    WashingPage,
    WashingTypePage,
    WashingDegreePage,
    WashingMaterialPage,
    MapsPage,
    CalendarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HTTP,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    WardrobeServiceProvider,
    NFC,
    Ndef,
    ItemServiceProvider,
    LaundryServiceProvider,
    GoogleMaps,
    Geolocation,
    Diagnostic,
    CoinwashServiceProvider,
    GooglePlus,
    CalendarServiceProvider,
    NetworkServiceProvider,
    Network
  ]
})
export class AppModule {}
