import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker
} from "@ionic-native/google-maps";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";
import { CoinwashServiceProvider } from "../../providers/coinwash-service/coinwash-service";
import { WashingPage } from "../washing/washing";
import { LaundryServiceProvider } from "../../providers/laundry-service/laundry-service";

@IonicPage()
@Component({
  selector: "page-maps",
  templateUrl: "maps.html"
})
export class MapsPage {
  map: GoogleMap;
  public errors: any = [];
  public keys: any = [];
  public token: string;
  public coinwashrooms: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private coinwashServiceProvider: CoinwashServiceProvider,
    private laundryServiceProvider: LaundryServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    // Check if location is enabled
    this.diagnostic
      .isLocationEnabled()
      .then(result => {
        this.geolocation
          .getCurrentPosition()
          .then(position => {
            alert(position);
            if (position.coords != undefined) {
              let mapOptions: GoogleMapOptions = {
                camera: {
                  target: { lat: "51.2160089", lng: "4.4066663" },
                  zoom: 16,
                  tilt: 30
                }
              };

              this.map = GoogleMaps.create("map_canvas", mapOptions);

              this.coinwashServiceProvider
                .getCoinWashrooms(this.token, "coinwash")
                .then(result => {
                  // Add the markers
                  this.coinwashrooms = result["data"];

                  for (let i = 0; i < this.coinwashrooms.length; i++) {
                    let marker: Marker = this.map.addMarkerSync({
                      title: this.coinwashrooms[i]["name"],
                      icon: "red",
                      animation: "BOUNCE",
                      snippet:
                        this.coinwashrooms[i]["street"] +
                        " " +
                        this.coinwashrooms[i]["number"] +
                        "\n" +
                        this.coinwashrooms[i]["zipcode"] +
                        " " +
                        this.coinwashrooms[i]["city"] +
                        "\n\n" +
                        "Choose this Washroom",
                      position: {
                        lat: this.coinwashrooms[i]["latitude"],
                        lng: this.coinwashrooms[i]["longitude"]
                      }
                    });

                    marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                      // add washcoin to db
                      this.laundryServiceProvider
                        .updateCoinWashId(
                          this.token,
                          "laundry/",
                          this.coinwashrooms[i]["id"]
                        )
                        .then(result => {
                          this.navCtrl.push(WashingPage);
                        });
                    });
                  }
                })
                .catch(err => {
                  alert("No data washrooms");
                });
            } else {
              this.errors.push("no coodinates");
            }
          })
          .catch(err => {
            alert(JSON.stringify(err));
            this.errors.push("Cannot find geolocation");
          });
      })
      .catch(err => {
        this.errors.push("Your location is disabled");
      });
  }

  selectedMarker() {
    console.log("clicked");
  }
}
