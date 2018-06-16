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
import { DeleteComponent } from "../../components/delete/delete";
import { CalendarServiceProvider } from "../../providers/calendar-service/calendar-service";

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
  public isCalendar: boolean = false;
  public name: string = "wardrobe";

  public currentDay: any = new Date();

  icons: Array<{ image: string; width: Number; alt: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wardrobeServiceProvider: WardrobeServiceProvider,
    private laundryServiceProvider: LaundryServiceProvider,
    private modalController: ModalController,
    private toastController: ToastController,
    private calendarServiceProvider: CalendarServiceProvider
  ) {
    this.icons = [
      { image: "calendarNG", width: 10, alt: "calendar" },
      { image: "laundryNG", width: 25, alt: "laundry" },
      { image: "trashbagNG", width: 10, alt: "trashbag" }
    ];
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
  }

  ionViewDidLoad() {
    this.getItem(this.navParams.get("data"), this.token);

    if (this.navParams.get("isCalender") != undefined) {
      this.isCalendar = this.navParams.get("isCalender");
    }

    if (this.navParams.get("date") != undefined) {
      this.currentDay = this.navParams.get("date");
    }
  }

  getItem(id, token) {
    this.wardrobeServiceProvider
      .getWardrobeById(id, token, "wardrobe")
      .then(result => {
        // TODO: sometimes symbols not showing
        this.items = result["data"];
        this.current = 0;
      });
  }

  showDetail(event, category) {
    this.current = category.id;
    if (event.target.children[1] != undefined) {
      event.target.children[1].classList.remove("hide");
      event.target.children[1].classList.add("show");
    }
  }

  close(event) {
    // TODO: close show element
    let target = event.currentTarget.parentNode;
    if (target.classList.contains("show")) {
      target.classList.remove("show");
      target.classList.add("hide");
    } else {
      target.classList.add("show");
      target.classList.remove("hide");
    }
  }

  delete(id) {
    this.wardrobeServiceProvider
      .getItemById(id, this.token, "wardrobe/get/")
      .then(result => {
        let modal = this.modalController.create(
          DeleteComponent,
          { data: result["data"] },
          {
            showBackdrop: true,
            enableBackdropDismiss: true
          }
        );
        modal.onDidDismiss(data => {
          if (data != null || data != undefined) {
            this.ionViewDidLoad();
          }
        });
        modal.present();
      })
      .catch(err => {
        this.toastController
          .create({
            message: "Could not delete this item",
            duration: 3000,
            dismissOnPageChange: true
          })
          .present();
      });
  }

  addToLaundry(id) {
    this.laundryServiceProvider
      .addItemInLaundry(id, this.token, "laundry")
      .then(result => {
        this.toastController
          .create({
            message: result["data"][0]["message"],
            duration: 3000,
            dismissOnPageChange: true
          })
          .present();
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

  addToCalendar(user_itemID, categoryID) {
    let modal = this.modalController.create(
      CalendarComponent,
      { uiID: user_itemID, cID: categoryID },
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );
    modal.present();
  }

  addToCalendarPage(category) {
    this.calendarServiceProvider
      .addItemInCalendar(this.token, "calendar", {
        user_itemID: category.pivot.id,
        date: this.currentDay
      })
      .then(res => {
        this.navCtrl.pop();
      })
      .catch(err => {
        // console.log(JSON.stringify(err));
      });
  }
}
