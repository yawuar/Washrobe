import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { WashingTypePage } from "../washing-type/washing-type";

@IonicPage()
@Component({
  selector: "page-washing",
  templateUrl: "washing.html"
})
export class WashingPage {
  private token: string = "";
  public items: any = [];
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
      });
  }

  getColor(color) {
    this.navCtrl.push(WashingTypePage, { data: this.items[0][color] });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad WashingPage");
  }
}
