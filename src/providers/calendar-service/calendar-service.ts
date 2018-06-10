import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

let url = "http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/";

/*
  Generated class for the CalendarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalendarServiceProvider {
  constructor(public http: HttpClient) {
    // console.log('Hello CalendarServiceProvider Provider');
  }

  getItemsByDay(token, type, day) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.post(url + type + day, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  addItemInCalendar(token, type, body) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
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
