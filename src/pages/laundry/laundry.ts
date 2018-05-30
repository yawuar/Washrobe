import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { LaundryItemPage } from "../laundry-item/laundry-item";

@IonicPage()
@Component({
  selector: "page-laundry",
  templateUrl: "laundry.html"
})
export class LaundryPage {
  public categories: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.getWardrobeByGender(localStorage.getItem("currentUser"));
  }

  ionViewDidLoad() {}

  getWardrobeByGender(user) {
    if (user) {
      let gender = JSON.parse(user).gender;
      let token = JSON.parse(user).token;
      this.laundryServiceProvider
        .getLaundry(token, "laundry", gender)
        .then(result => {
          this.categories = result["data"];
        });
    }
  }

  showCategory(id) {
    this.navCtrl.setRoot(LaundryItemPage, {
      data: id
    });
  }
}
