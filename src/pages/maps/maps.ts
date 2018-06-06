import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LocationService,
  MyLocation
} from "@ionic-native/google-maps";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { Diagnostic } from "@ionic-native/diagnostic";

@IonicPage()
@Component({
  selector: "page-maps",
  templateUrl: "maps.html"
})
export class MapsPage {
  map: GoogleMap;
  public errors: any = [];
  public keys: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic
  ) {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    // Check if location is enabled
    this.diagnostic
      .isLocationEnabled()
      .then(result => {
        this.geolocation.watchPosition().subscribe(
          position => {
            if (position.coords != undefined) {
              let mapOptions: GoogleMapOptions = {
                camera: {
                  target: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  },
                  zoom: 18,
                  tilt: 30
                }
              };

              this.map = GoogleMaps.create("map_canvas", mapOptions);

              let marker: Marker = this.map.addMarkerSync({
                title: "Ionic",
                icon: "blue",
                animation: "DROP",
                position: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              });
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                alert("clicked");
              });
            } else {
              let error = { cordova: "no cordova available" };
              this.errors.push(error);
              this.keys = Object.keys(error);
            }
          },
          err => {
            let error = { "no-data": "Cannot find geolocation" };
            this.errors.push(error);
            this.keys = Object.keys(error);
          }
        );
      })
      .catch(err => {
        let error = { disabled: "Your location is disabled" };
        this.errors.push(error);
        this.keys = Object.keys(error);
      });
  }
}
