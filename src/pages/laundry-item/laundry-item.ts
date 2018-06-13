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
  public current: Number = 0;

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
        console.log(id);
        this.items = result["data"];
      });
  }

  showDetail(event, item) {
    this.current = item.id;
    if(event.target.children[1] != undefined) {
      event.target.children[1].classList.remove('hide');
      event.target.children[1].classList.add('show');
    }
  }

  close(event) {
    // TODO: close show element
    let target = event.currentTarget.parentNode;
    if (target.classList.contains('show')) {
      target.classList.remove('show');
      target.classList.add('hide');
    } else {
      target.classList.add('show');
      target.classList.remove('hide');
    }
  }

  goToOverview() {
    this.navCtrl.setRoot(WashingPage);
  }

  delete(data) {
    console.log(data.pivot.id);
    this.laundryServiceProvider
      .deleteLaundryById(data.pivot.id, this.token, "laundry")
      .then(result => {
        let index = this.items.indexOf(this.selectedItem);
        this.items.splice(index, 1);
      });
  }
}
