import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

let url = "http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/";

@Injectable()
export class ItemServiceProvider {
  constructor(public http: HttpClient) {}

  addItemToUser(token, type, hash) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });
      this.http.post(url + type + hash, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getItemById(token, type, id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.post(url + type + id, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getItemByHash(token, type, hash) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.post(url + type + hash, {}, { headers: headers }).subscribe(
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
