import { Component, Input, OnChanges } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
import { LaundryPage } from "../../pages/laundry/laundry";

/**
 * Generated class for the CustomHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "custom-header",
  templateUrl: "custom-header.html"
})
export class CustomHeaderComponent {
  @Input() icon: number = 0;
  private headImage: string = "assets/imgs/wardrobe.svg";
  private subImage: string = "assets/imgs/laundry.svg";

  private token;

  constructor(public navCtrl: NavController) {
    if (localStorage.getItem("currentUser")) {
      this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    }
  }

  openLaundry(id) {
    let page: any = LaundryPage;
    if (id) {
      page = HomePage;
    }
    this.navCtrl.setRoot(page, { data: this.token });
  }

  openHomePage(id) {
    let page: any = HomePage;
    if (id) {
      page = LaundryPage;
    }
    this.navCtrl.setRoot(page, { data: this.token });
  }

  ngOnChanges() {
    switch (this.icon) {
      case 1:
        this.headImage = "assets/imgs/laundry.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      case 2:
        this.headImage = "assets/imgs/calendar.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      default:
        this.headImage = "assets/imgs/wardrobe.svg";
        break;
    }
  }
}
