import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { WashingMaterialPage } from "../washing-material/washing-material";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.degrees = this.navParams.get("data");
  }

  getMaterial(degree) {
    this.navCtrl.push(WashingMaterialPage, { data: this.degrees[degree] });
  }

  ionViewDidLoad() {}
}
