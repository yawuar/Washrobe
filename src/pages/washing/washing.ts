import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { WashingTypePage } from "../washing-type/washing-type";
import { MapsPage } from "../maps/maps";

@IonicPage()
@Component({
  selector: "page-washing",
  templateUrl: "washing.html"
})
export class WashingPage {
  public items: any = [];
  private token: string;
  public keys;

  public hasGradient: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.laundryServiceProvider
      .getLaundrySorted(this.token, "laundry/items/sort")
      .then(result => {
        this.keys = Object.keys(result["data"]["laundry"]);
        this.items = Array.of(result["data"]["laundry"]);
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  getColor(color) {
    this.navCtrl.push(WashingTypePage, { data: this.items[0][color] });
  }

  isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
  }

  chooseLocation() {
    this.navCtrl.push(MapsPage);
  }

  ionViewDidLoad() {
  }
}
