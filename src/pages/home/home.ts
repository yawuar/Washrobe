import { Component } from "@angular/core";
import { NavController, Platform, ToastController } from "ionic-angular";

import { WardrobeServiceProvider } from "../../providers/wardrobe-service/wardrobe-service";

import { ItemPage } from "../item/item";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public categories: any = [];
  public amountOfTimes: any = [];
  public isLoggedIn: boolean = false;
  private user: any;

  constructor(
    public navCtrl: NavController,
    private wardrobeServiceProvider: WardrobeServiceProvider,
    private platform: Platform,
    private toastController: ToastController,
  ) {
    if (localStorage.getItem("currentUser")) {
      this.isLoggedIn = true;
      this.user = JSON.parse(localStorage.getItem("currentUser"));

      this.getWardrobeByGender(this.user);
    }
  }

  getWardrobeByGender(user) {
    if (user != null) {
      this.wardrobeServiceProvider
        .getWardrobe(user["token"], "wardrobe", user["gender"])
        .then(result => {
          this.categories = result["data"];
        })
        .catch(err => {
          this.presentToast(err);
        });
    } else {
      alert("user is NULL");
    }
  }

  showCategory(category) {
    this.navCtrl.push(ItemPage, { data: category.id, name: category.name });
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
