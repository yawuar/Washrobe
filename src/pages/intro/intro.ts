import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadPageAfterXSeconds();
  }

  loadPageAfterXSeconds() {
    var seconds = 2000;
    setTimeout(() => {
      this.navCtrl.setRoot(LoginPage);
    }, seconds);
  }

}
