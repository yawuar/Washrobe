import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

/**
 * Generated class for the LaundryItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-laundry-item",
  templateUrl: "laundry-item.html"
})
export class LaundryItemPage {
  public items: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.getLaundryItems(
      this.navParams.get("data"),
      JSON.parse(localStorage.getItem("currentUser"))["token"]
    );
  }

  ionViewDidLoad() {}

  getLaundryItems(id, token) {
    this.laundryServiceProvider
      .getLaundryById(id, token, "laundry/item")
      .then(result => {
        this.items = result["data"];
      });
  }
}
