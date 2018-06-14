import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../../pages/home/home";
import { LaundryPage } from "../../pages/laundry/laundry";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { CalendarPage } from "../../pages/calendar/calendar";

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

  public title: string = "Wardrobe";

  private token: string;

  public amountLaundry: number = 0;

  constructor(
    public navCtrl: NavController,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    if (localStorage.getItem("currentUser")) {
      this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    }

    this.laundryServiceProvider
      .getAllLaundryByUser(this.token, "laundry/get")
      .then(result => {
        this.amountLaundry = result["data"];
      });
  }

  openLaundry(id) {
    let page = this.getSubPage(id);
    console.log('id = ' + id);
    this.navCtrl.setRoot(page, { data: this.token });
  }

  openHomePage(id) {
    let page = this.getPage(id);
    this.navCtrl.setRoot(page, { data: this.token });
  }

  getSubPage(id): any {
    let page: any;
    switch(id) {
      case 0:
        page = LaundryPage;
        break;

      case 1:
        page = HomePage;
        break;

      case 2:
        page = HomePage;
        break;
    }

    return page;
  }

  getPage(id): any {
    let page: any;
    switch(id) {
      case 0:
        page = HomePage;
        break;

      case 1:
        page = LaundryPage;
        break;

      case 2:
        page = CalendarPage;
        break;
    }

    return page;
  }

  ngOnChanges() {
    switch (this.icon) {
      case 1:
        this.title = "Laundry";
        this.headImage = "assets/imgs/laundry.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      case 2:
        this.title = "Calendar";
        this.headImage = "assets/imgs/calendar.svg";
        this.subImage = "assets/imgs/wardrobe.svg";
        break;

      default:
        this.title = "Wardrobe";
        this.headImage = "assets/imgs/wardrobe.svg";
        break;
    }
  }
}
