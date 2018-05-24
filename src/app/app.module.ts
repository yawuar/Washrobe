import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HTTP } from '@ionic-native/http'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { ItemPage } from '../pages/item/item';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';

import { CustomHeaderComponent } from '../components/custom-header/custom-header';
import { WardrobeServiceProvider } from '../providers/wardrobe-service/wardrobe-service';
import { RegistrationPage } from '../pages/registration/registration';
import { ScanPage } from '../pages/scan/scan';
import { NFC, Ndef } from '@ionic-native/nfc';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    ItemPage,
    CustomHeaderComponent,
    RegistrationPage,
    ScanPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    LoginPage,
    ItemPage,
    RegistrationPage,
    ScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    WardrobeServiceProvider,
    NFC,
    Ndef
  ]
})
export class AppModule {}
