import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";

/**
 * Generated class for the ItemHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "item-header",
  templateUrl: "item-header.html"
})
export class ItemHeaderComponent {
  @Input("item") item;
  constructor(private navController: NavController) {}

  openHomePage() {
    this.navController.setRoot(HomePage);
  }
}
