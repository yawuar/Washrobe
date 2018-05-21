import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let url = 'http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(data, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(url + type, JSON.stringify(data), {headers: headers}).subscribe(
        res => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  register(data, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(url + type, JSON.stringify(data), {headers: headers}).subscribe(
        res => {
          console.log(JSON.stringify(res));
          resolve(res);
        },
        (err) => {
          console.log(JSON.stringify(err));
          reject(err);
        }
      );
    });
  }

  getUserInformation(token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      });

      this.http.post(url + type, {}, {headers: headers}).subscribe(
        res => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
    });
  }
}
