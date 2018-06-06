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
  public error: boolean = false;
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
              // This is no cordova
              console.log("shit");
            }
          },
          err => {
            alert("shit");
          }
        );
      })
      .catch(err => {
        this.error = true;
      });
  }
}
