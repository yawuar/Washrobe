import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  private url: 'http://52.14.23.226/api';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.http.post(this.url + '/login', this.user.value, {headers: { 'Content-Type': 'application/json' }})
      .then(data => {
        console.log(data.data);
      }).catch(error => {
        console.log(error.status);
      });
  }

}
