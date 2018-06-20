import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { WashingDegreePage } from "../washing-degree/washing-degree";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { MapsPage } from "../maps/maps";

/**
 * Generated class for the WashingTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-washing-type",
  templateUrl: "washing-type.html"
})
export class WashingTypePage {
  public types: any = [];
  public name: string = "type";
  public washroom: any = [];
  private token: string;
  public amountOfMachines: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.types = this.navParams.get("data");
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.laundryServiceProvider
      .getLaundrySorted(this.token, "laundry/items/sort")
      .then(result => {
        this.washroom = result["data"]["information"];

        this.amountOfMachines = this.countMachines(result["data"]["laundry"]);
      })
      .catch(err => {
        // alert(JSON.stringify(err));
      });
  }

  getDegree(degree) {
    this.navCtrl.push(WashingDegreePage, { data: this.types[degree] });
  }

  chooseLocation() {
    this.navCtrl.push(MapsPage);
  }

  countMachines(items) {
    let i = [];
    for (let key in items) {
      if (items[key].length != 0) {
        for (let k in items[key]) {
          for (let degrees in items[key][k]) {
            for (let index in items[key][k][degrees]) {
              i.push(index);
            }
          }
        }
      }
    }

    return i;
  }
}
