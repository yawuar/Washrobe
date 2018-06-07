import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

let url = "http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/";

@Injectable()
export class CoinwashServiceProvider {
  constructor(public http: HttpClient) {
    console.log("Hello CoinwashServiceProvider Provider");
  }

  getCoinWashrooms(token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
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
}
