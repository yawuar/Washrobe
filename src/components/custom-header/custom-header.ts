import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LaundryPage } from '../../pages/laundry/laundry';

/**
 * Generated class for the CustomHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.html'
})

export class CustomHeaderComponent {
  constructor(public navCtrl: NavController,) {
  }

  openLaundry() {
    this.navCtrl.setRoot(LaundryPage);
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage, { data: JSON.parse(localStorage.getItem('currentUser'))['token'] });
  }

}
