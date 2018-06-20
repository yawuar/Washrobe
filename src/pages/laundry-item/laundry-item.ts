import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ModalController
} from "ionic-angular";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";
import { WashingPage } from "../washing/washing";
import { WardrobeServiceProvider } from "../../providers/wardrobe-service/wardrobe-service";
import { DeleteLaundryItemComponent } from "../../components/delete-laundry-item/delete-laundry-item";

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

  public hasLaundry: boolean = false;
  public item: string = "wardrobe";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private laundryServiceProvider: LaundryServiceProvider,
    private wardrobeServiceProvider: WardrobeServiceProvider,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];

    this.checkIfHasItems();

    if (this.navParams.get("name") != undefined) {
      this.item = this.navParams.get("name");
    }

    // this.getLaundryItems(this.navParams.get("data"), this.token);
  }

  ionViewWillEnter() {
    this.getLaundryItems(this.navParams.get("data"), this.token);
  }

  getLaundryItems(id, token) {
    this.laundryServiceProvider
      .getLaundryById(id, token, "laundry/item")
      .then(result => {
        this.items = result["data"];
        this.current = 0;
      }).catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  showDetail(event, item) {
    this.current = item.id;
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

  goToOverview() {
    this.navCtrl.setRoot(WashingPage);
  }

  delete(data) {
    this.wardrobeServiceProvider
      .getItemById(data.pivot.id, this.token, "wardrobe/get/")
      .then(result => {
        let modal = this.modalController.create(
          DeleteLaundryItemComponent,
          { data: result["data"] },
          {
            showBackdrop: true,
            enableBackdropDismiss: true
          }
        );
        modal.onDidDismiss(data => {
          if (data != null || data != undefined) {
            this.ionViewWillEnter();
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

  checkIfHasItems() {
    this.laundryServiceProvider
      .getAllLaundryByUser(this.token, "laundry/get")
      .then(result => {
        if (result["data"] > 0) {
          this.hasLaundry = true;
        }
      });
  }
}
