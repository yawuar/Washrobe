import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { WashedComponent } from "../../components/washed/washed";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

/**
 * Generated class for the WashingMaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-washing-material",
  templateUrl: "washing-material.html"
})
export class WashingMaterialPage {
  public materials: any = [];
  isWashed: boolean;
  private token: string;

  public washroom: any = [];
  public amountOfMachines: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.laundryServiceProvider
      .getLaundrySorted(this.token, "laundry/items/sort")
      .then(result => {
        this.washroom = result["data"]["information"];

        this.amountOfMachines = this.countMachines(result["data"]["laundry"]);
      })
      .catch(err => {
        // alert(JSON.stringify(err));
      });
  }

  ionViewDidLoad() {
    this.materials = this.navParams.get("data");
  }

  showModal(res) {
    let modal = this.modalController.create(
      WashedComponent,
      { data: this.isWashed },
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    );
    modal.onDidDismiss(data => {
      if (data != null || data != undefined) {
        for (let s in res) {
          console.log(res[s]);
          this.laundryServiceProvider
            .updateIsWashedForClothes(
              this.token,
              "laundry/update/isWashed/",
              res[s].pivot.id
            )
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }

        this.ionViewDidLoad();
      }
    });
    modal.present();
  }

  countMachines(items) {
    let i = [];
    for (let key in items) {
      if (items[key].length != 0) {
        for (let k in items[key]) {
          for (let degrees in items[key][k]) {
            for (let index in items[key][k][degrees]) {
              i.push(index);
            }
          }
        }
      }
    }

    return i;
  }
}
