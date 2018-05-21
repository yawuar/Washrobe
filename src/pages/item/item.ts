import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WardrobeServiceProvider } from '../../providers/wardrobe-service/wardrobe-service';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  private token;
  public items: any = [];
  public selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wardrobeServiceProvider:WardrobeServiceProvider) {
    this.token = JSON.parse(localStorage.getItem('currentUser'))['token'];
    this.getItem(this.navParams.get('data'), this.token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

  getItem(id, token) {
    this.wardrobeServiceProvider.getWardrobeById(id, token, 'wardrobe')
    .then(result => {
      this.items = result['data'];
    });
  }

  showDetail(item) {
    this.selectedItem = item;
    // this.showInformation = 'overlay';
    console.log(this.selectedItem);
  }

}
