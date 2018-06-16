import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";

/**
 * Generated class for the CalendarHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "calendar-header",
  templateUrl: "calendar-header.html"
})
export class CalendarHeaderComponent {
  @Input("name") name;
  constructor(private navController: NavController) {}

  openHomePage() {
    this.navController.setRoot(HomePage);
  }
}
