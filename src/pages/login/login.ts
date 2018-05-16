import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Keyboard } from '@ionic-native/keyboard';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';


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
  // private url : '52.14.23.226/api';

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, private keyboard: Keyboard, private platform: Platform) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.keyboard.disableScroll(true);
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.keyboard.disableScroll(true);
    });
  }

  login() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/login', this.user.value, { headers: headers })
      .then(data => {
        this.navCtrl.push(HomePage, {
          data: data.data
        });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }

}
