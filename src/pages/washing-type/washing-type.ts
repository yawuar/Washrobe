import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { WashingDegreePage } from "../washing-degree/washing-degree";

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
  public name: string = 'type';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.types = this.navParams.get("data");
  }

  getDegree(degree) {
    this.navCtrl.push(WashingDegreePage, { data: this.types[degree] });
  }

  ionViewDidLoad() {}
}
