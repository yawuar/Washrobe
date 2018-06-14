import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { WardrobeServiceProvider } from '../../providers/wardrobe-service/wardrobe-service';
import { ItemPage } from '../../pages/item/item';

/**
 * Generated class for the DeleteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'delete',
  templateUrl: 'delete.html'
})
export class DeleteComponent {

  text: string;
  private token;
  public item: any = [];

  constructor(private navParams: NavParams, private wardrobeServiceProvider: WardrobeServiceProvider, private navController: NavController) {
    this.text = 'Hello World';

    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.item = this.navParams.get('data')[0];
    console.log(this.item);
  }

  delete(id) {
    this.wardrobeServiceProvider
      .deleteItemInWardrobe(id, this.token, "wardrobe")
      .then(result => {
        // TODO. dismiss controller
        this.navController.push(ItemPage, { data: id });
      });
  }

}
