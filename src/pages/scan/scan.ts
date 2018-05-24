import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NFC, Ndef } from '@ionic-native/nfc';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  public error: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC, private ndef: Ndef) {
    this.nfc.addNdefListener(() => {
      // console.log('successfully attached ndef listener');
    }, (err) => {
      this.error = 'unavailable';
    }).subscribe((event) => {
      if (event && event.tag && event.tag.id) {
        let payload = event.tag.ndefMessage[0].payload;
        let content = this.nfc.bytesToString(payload).substring(3);
        if(content) {
          alert(content);
        } else {
          alert('NFC not detected');
        }
      }
    });
  }

  test() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }
  

}
