import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { WashingPage } from "../washing/washing";

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
  public token;
  public isOpen: boolean = false;

  public selectedItem: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.getLaundryItems(this.navParams.get("data"), this.token);
  }

  ionViewDidLoad() {}

  getLaundryItems(id, token) {
    this.laundryServiceProvider
      .getLaundryById(id, token, "laundry/item")
      .then(result => {
        this.items = result["data"];
      });
  }

  showDetail() {
    this.isOpen = !this.isOpen;
  }

  goToOverview() {
    this.navCtrl.setRoot(WashingPage);
  }

  delete(data) {
    console.log(data.pivot.id);
    this.laundryServiceProvider
      .deleteLaundryById(data.pivot.id, this.token, "laundry")
      .then(result => {
        console.log(result);
        let index = this.items.indexOf(this.selectedItem);
        this.items.splice(index, 1);
      });
  }
}
