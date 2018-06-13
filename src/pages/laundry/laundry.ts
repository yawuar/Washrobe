import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { LaundryItemPage } from "../laundry-item/laundry-item";
import { WashingPage } from "../washing/washing";

@IonicPage()
@Component({
  selector: "page-laundry",
  templateUrl: "laundry.html"
})
export class LaundryPage {
  public categories: any = [];
  public token: string;
  public hasLaundry: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.getWardrobeByGender(localStorage.getItem("currentUser"));

    this.checkIfHasItems();
  }

  ionViewDidLoad() {}

  getWardrobeByGender(user) {
    if (user) {
      let gender = JSON.parse(user).gender;
      this.laundryServiceProvider
        .getLaundry(this.token, "laundry", gender)
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

  goToOverview() {
    this.laundryServiceProvider
      .getAllLaundryByUser(this.token, "laundry/get")
      .then(result => {
        if (result["data"] > 0) {
          this.navCtrl.push(WashingPage);
        } else {
          // show error that there is no items in laundry
          console.log("show modal");
        }
      });
  }

  checkIfHasItems() {
    this.laundryServiceProvider
      .getAllLaundryByUser(this.token, "laundry/get")
      .then(result => {
        if(result['data'] > 0) {
          this.hasLaundry = true;
        }
      });
  }
}
