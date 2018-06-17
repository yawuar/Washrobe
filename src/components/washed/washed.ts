import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

/**
 * Generated class for the WashedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "washed",
  templateUrl: "washed.html"
})
export class WashedComponent {
  public isGoingToBeWashed: boolean = false;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController
  ) {
    this.isGoingToBeWashed = this.navParams.get("data");
  }

  close() {
    this.viewController.dismiss();
  }

  itsWashed() {
    this.viewController.dismiss({ data: 1 });
  }
}
