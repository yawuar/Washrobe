import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

let url = "http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/";

@Injectable()
export class LaundryServiceProvider {
  constructor(public http: HttpClient) {
    // console.log('Hello LaundryServiceProvider Provider');
  }

  addItemInLaundry(id, token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.post(url + type + "/" + id, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getLaundry(token, type, gender) {
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

  getLaundryById(id, token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.post(url + type + "/" + id, {}, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteLaundryById(id, token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.delete(url + type + "/" + id, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getAllLaundryByUser(token, type) {
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

  getLaundrySorted(token, type) {
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

  updateCoinWashId(token, type, id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      });

      this.http.put(url + type + id, {}, { headers: headers }).subscribe(
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
