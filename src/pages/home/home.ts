import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import { RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public token;
  
  constructor(public navCtrl: NavController, private navParams: NavParams, private http: HTTP) {
  
    this.getUserInformation(this.navParams.get('data'));
  }

  getUserInformation(data) {
    let token = JSON.parse(data).success.token;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    this.http.setDataSerializer('json');
    this.http.get('http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/user', {}, options)
    .then(data => {
      alert(JSON.stringify(data));
    })
    .catch(err => {
      alert(err);
    });
  }
}
