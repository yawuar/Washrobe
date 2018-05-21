import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { unescapeIdentifier } from '@angular/compiler';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  private registration : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authServiceProvider: AuthServiceProvider) {
    this.registration = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  register() {
    if(this.registration.value == undefined) {
      this.registration.value.gender = 1;
    }

    console.log(this.registration.value);
    // this.authServiceProvider.register(this.registration.value, 'register')
    // .then(result => {
    //   this.navCtrl.push(HomePage, { data: result['success']['token'] });
    // });
  }

  test(event) {
    // if(event == undefined) {
    //   event = 1;
    // }
    // this.registration.get('gender').setValue(event);
    // console.log(event);
  }
}
