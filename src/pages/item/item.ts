import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";

import { WardrobeServiceProvider } from "../../providers/wardrobe-service/wardrobe-service";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { ScanPage } from "../scan/scan";

import { ImgLoader } from "ionic-image-loader";
import { CalendarComponent } from "../../components/calendar/calendar";

@IonicPage()
@Component({
  selector: "page-item",
  templateUrl: "item.html"
})
export class ItemPage {
  private token;
  public items: any = [];
  public selectedItem: any;
  public current: Number = 0;

  icons: Array<{ image: string; width: Number; alt: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wardrobeServiceProvider: WardrobeServiceProvider,
    private laundryServiceProvider: LaundryServiceProvider,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.icons = [
      { image: "calendarNG", width: 10, alt: "calendar" },
      { image: "laundryNG", width: 25, alt: "laundry" },
      { image: "trashbagNG", width: 10, alt: "trashbag" }
    ];
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.getItem(this.navParams.get("data"), this.token);
  }

  ionViewDidLoad() {}

  getItem(id, token) {
    this.wardrobeServiceProvider
      .getWardrobeById(id, token, "wardrobe")
      .then(result => {
        this.items = result["data"];
      });
  }

  showDetail(category) {
    this.current = category.id;
  }

  close(event) {
    // TODO: close show element
    // // event.target.parentNode.parentNode.classList.remove('show');
    // event.target.parentNode.parentNode.classList.add('hide');
    // // this.current = 0;
  }

  delete(id) {
    this.wardrobeServiceProvider
      .deleteItemInWardrobe(id, this.token, "wardrobe")
      .then(result => {
        let index = this.items.indexOf(this.selectedItem);
        this.items.splice(index, 1);
      });
  }

  addToLaundry(id) {
    this.laundryServiceProvider
      .addItemInLaundry(id, this.token, "laundry")
      .then(result => {
        this.toastController.create({
          message: result['data'][0]['message'],
          duration: 3000,
          dismissOnPageChange: true
        }).present();
      })
      .catch(err => {
        console.log(err);
      });
  }

  scan() {
    this.navCtrl.push(ScanPage);
  }

  onImageLoad(imgLoader: ImgLoader) {
    // console.log(imgLoader);
  }

  addToCalendar(user_itemID, categoryID) {
    let modal = this.modalController.create(
      CalendarComponent, { uiID: user_itemID, cID: categoryID},
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );
    modal.present();
  }

  action(event, category) {
    let alt = event.target.alt;

    switch (alt) {
      case "calendar":
        this.addToCalendar(category.pivot.id, category.categoryID);
        break;

      case "laundry":
        this.addToLaundry(category.pivot.item_id);
        break;

      case "trashbag":
        this.delete(category.pivot.id);
        break;
    }
  }
}
