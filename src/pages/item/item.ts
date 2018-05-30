import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { WardrobeServiceProvider } from "../../providers/wardrobe-service/wardrobe-service";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { ScanPage } from "../scan/scan";

import { ImgLoader } from "ionic-image-loader";

@IonicPage()
@Component({
  selector: "page-item",
  templateUrl: "item.html"
})
export class ItemPage {
  private token;
  public items: any = [];
  public selectedItem: any;

  public isOpen: boolean = false;

  icons: Array<{ image: string; width: Number; alt: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wardrobeServiceProvider: WardrobeServiceProvider,
    private laundryServiceProvider: LaundryServiceProvider
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

  showDetail() {
    this.isOpen = !this.isOpen;
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
        console.log(result);
      });
  }

  scan() {
    this.navCtrl.push(ScanPage);
  }

  onImageLoad(imgLoader: ImgLoader) {
    console.log(imgLoader);
  }

  action(event, category) {
    let alt = event.target.alt;
    switch (alt) {
      case "calendar":
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
