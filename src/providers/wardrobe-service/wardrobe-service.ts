import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let url = 'http://ec2-52-14-23-226.us-east-2.compute.amazonaws.com/api/';

@Injectable()
export class WardrobeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WardrobeServiceProvider Provider');
  }

  getWardrobe(token, type, gender) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      this.http.post(url + type, { 'gender': gender }, {headers: headers}).subscribe(
        res => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
    });
  }

  getWardrobeById(id, token, type) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      this.http.post(url + type + '/' + id, {}, {headers: headers}).subscribe(
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
