import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { WashingMaterialPage } from "../washing-material/washing-material";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

/**
 * Generated class for the WashingDegreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-washing-degree",
  templateUrl: "washing-degree.html"
})
export class WashingDegreePage {
  public degrees: any = [];
  public name: string = "degrees";
  public washroom: any = [];
  private token: string;
  public amountOfMachines: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.degrees = this.navParams.get("data");
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

  getMaterial(degree) {
    this.navCtrl.push(WashingMaterialPage, { data: this.degrees[degree] });
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
