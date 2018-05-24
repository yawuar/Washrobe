import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private keyboard: Keyboard, private platform: Platform, private authServiceProvider: AuthServiceProvider) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.keyboard.disableScroll(true);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.keyboard.disableScroll(true);
    });
  }

  login() {
    this.authServiceProvider.login(this.user.value, 'login')
      .then(result => {
          this.navCtrl.push(HomePage, { data: result['success']['token'] });
      });
  }

  showRegistration() {
    this.navCtrl.push(RegistrationPage);
  }

}
