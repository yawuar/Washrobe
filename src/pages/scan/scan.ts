import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  ToastController,
  Events
} from "ionic-angular";

import { NFC, Ndef } from "@ionic-native/nfc";

import { ItemServiceProvider } from "../../providers/item-service/item-service";
import { ItemPage } from "../item/item";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScanComponent } from "../../components/scan/scan";
import { NetworkServiceProvider } from "../../providers/network-service/network-service";
import { Diagnostic } from "@ionic-native/diagnostic";

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-scan",
  templateUrl: "scan.html"
})
export class ScanPage {
  public error: string = "";
  private code: FormGroup;
  public token;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nfc: NFC,
    private ndef: Ndef,
    private itemServiceProvider: ItemServiceProvider,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController,
    private networkServiceProvider: NetworkServiceProvider,
    private events: Events,
    private diagnostic: Diagnostic
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];

    this.code = this.formBuilder.group({
      code: ["", Validators.required]
    });
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        if (this.diagnostic.NFCState.POWERED_ON) {
          this.error = "available";
          this.nfc
            .addNdefListener(
              () => {
                this.error = "available";
              },
              err => {
                this.error = "unavailable";
              }
            )
            .subscribe(event => {
              if (event && event.tag && event.tag.id) {
                let payload = event.tag.ndefMessage[0].payload;
                let content = this.nfc.bytesToString(payload).substring(3);
                if (content) {
                  this.addHashCode(content);
                } else {
                  this.error = "unavailable";
                }
              }
            });
        }

        if (this.diagnostic.NFCState.POWERED_OFF) {
          this.error = "unavailable";
        }
      } else {
        this.error = "unavailable";
      }
    });
  }

  displayNetworkUpdate(state: string) {
    this.toastController
      .create({
        message: "You are now " + state,
        duration: 3000
      })
      .present();
  }

  addHashCode(code) {
    if (!code) {
      code = this.code["code"];
    }
    this.itemServiceProvider
      .getItemByHash(this.token, "item/getHash/", code)
      .then(res => {
        let modal = this.modalController.create(
          ScanComponent,
          { data: res },
          {
            showBackdrop: true,
            enableBackdropDismiss: true
          }
        );

        modal.onDidDismiss(data => {
          if (data != null || data != undefined) {
            this.navCtrl.push(ItemPage, { data: data.categoryID, isNew: true });
          }
        });
        modal.present();
      })
      .catch(err => {
        this.toastController
          .create({
            message: "We could not get the data",
            duration: 3000,
            dismissOnPageChange: true
          })
          .present();
      });
  }
}
