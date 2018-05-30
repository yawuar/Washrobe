import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { WardrobeServiceProvider } from "../../providers/wardrobe-service/wardrobe-service";

import { ItemPage } from "../item/item";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public categories: any = [];
  public amountOfTimes: any = [];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private wardrobeServiceProvider: WardrobeServiceProvider
  ) {
    if (!localStorage.getItem("currentUser")) {
      this.getUserInformation(this.navParams.get("data"));
    } else {
      console.log("hallo");
    }
    this.getWardrobeByGender(localStorage.getItem("currentUser"));
  }

  getUserInformation(token) {
    console.log(token);
    this.authServiceProvider.getUserInformation(token, "user").then(result => {
      let items = result["success"];
      items.token = token;
      items.loggedIn = true;

      localStorage.setItem("currentUser", JSON.stringify(items));
    });
  }

  getWardrobeByGender(user) {
    if (user) {
      let gender = JSON.parse(user).gender;
      let token = JSON.parse(user).token;
      this.wardrobeServiceProvider
        .getWardrobe(token, "wardrobe", gender)
        .then(result => {
          this.categories = result["data"];
        });
    }
  }

  showCategory(id) {
    this.navCtrl.setRoot(ItemPage, { data: id });
  }
}
