import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public token;
  
  constructor(public navCtrl: NavController, private navParams: NavParams, private authServiceProvider:AuthServiceProvider) {
  
    this.getUserInformation(this.navParams.get('data'));
    this.getWardrobeByGender(localStorage.getItem('currentUser'));
  }

  getUserInformation(token) {
    this.authServiceProvider.getUserInformation(token, 'user')
    .then(result => {
      let items = result.success;
      items.token = token;
      localStorage.setItem('currentUser', JSON.stringify(items));
    });
  }

  getWardrobeByGender(user) {

    if(user) {
      let gender = JSON.parse(user).gender;
      let token = JSON.parse(user).token;
      this.authServiceProvider.getUserInformation(token, 'wardrobe', gender)
        .then(result => {
          console.log(result);
        }
      );
    }
  }
}

