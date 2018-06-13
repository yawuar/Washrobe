import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from "@ionic-native/google-plus";
import { Platform } from "ionic-angular";


let url = "http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/";

@Injectable()
export class AuthServiceProvider {
  user: Observable<firebase.User>;
  constructor(public http: HttpClient, private afAuth: AngularFireAuth, private gplus: GooglePlus, private platform: Platform) {
    this.user = this.afAuth.authState;
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '648851499943-99dpulge6hcgjjq7mhcjud77ho28ma6f.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'email familyName givenName'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      return await credential;
    } catch (err) {
      console.log(err);
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }

  login(data, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT"
      });

      this.http
        .post(url + type, JSON.stringify(data), { headers: headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  register(data, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        "Content-Type": "application/json"
      });

      this.http
        .post(url + type, JSON.stringify(data), { headers: headers })
        .subscribe(
          res => {
            console.log(JSON.stringify(res));
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  logout(token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      });

      this.http.post(url + type, {}, { headers: headers }).subscribe(
        res => {
          localStorage.clear();
        },
        err => {
          reject(err);
        }
      );
    });
  }


  getUserInformation(token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      });

      this.http.post(url + type, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getUserByEmail(type, body) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT"
      });

      this.http.post(url + type, body, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
