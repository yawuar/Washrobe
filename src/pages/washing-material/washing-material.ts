import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the WashingMaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-washing-material",
  templateUrl: "washing-material.html"
})
export class WashingMaterialPage {
  public materials: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.materials = this.navParams.get("data");
  }

  ionViewDidLoad() {}
}
