import { Component } from "@angular/core";
import { ViewController, NavParams, NavController, Item } from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

@Component({
  selector: "delete-laundry-item",
  templateUrl: "delete-laundry-item.html"
})
export class DeleteLaundryItemComponent {
  private token;
  public item: any = [];

  constructor( private navParams: NavParams, private laundryServiceProvider: LaundryServiceProvider, private viewController: ViewController) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.item = this.navParams.get("data")[0];
  }

  delete(id) {
    this.laundryServiceProvider
      .deleteLaundryById(id, this.token, "laundry")
      .then(result => {
        this.viewController.dismiss(result['data']);
      });
  }
}
