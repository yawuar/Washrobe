import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform } from "ionic-angular";

import { Validators, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";

import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { HomePage } from "../home/home";
import { RegistrationPage } from "../registration/registration";

import { GooglePlus } from "@ionic-native/google-plus";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private user: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  private loading: any;
  private data: any;
  public error: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authServiceProvider: AuthServiceProvider,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public googlePlus: GooglePlus,
    private platform: Platform
  ) {
    this.user = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.email = this.user.controls['email'];
    this.password = this.user.controls['password'];
  }

  login() {
    this.showLoader();
    this.authServiceProvider
      .login(this.user.value, "login")
      .then(result => {
        this.loading.dismiss();
        this.data = result["success"];
        this.authServiceProvider
          .getUserInformation(this.data["token"], "user")
          .then(res => {
            let items = res["success"];
            items.token = this.data["token"];
            localStorage.setItem("currentUser", JSON.stringify(items));
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err => {
            this.error = err['error'];
            this.loading.dismiss();
          });
      })
      .catch(err => {
        this.error = err['error'];
        this.loading.dismiss();
      });
  }

  showLoader() {
    this.loading = this.loadingController.create({
      content: "Authenticating..."
    });
    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastController.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  showRegistration() {
    this.navCtrl.setRoot(RegistrationPage);
  }

  loginWithGoogle() {
    if(this.platform.is('cordova')) {
      this.authServiceProvider.nativeGoogleLogin().then(res => {
        alert(JSON.stringify(res));
      }).catch(err => {

      });
    } else {
      this.authServiceProvider.webGoogleLogin().then(res => {
        // this.getUserCheckIfIsInDb(res['additionalUserInfo']['profile']);
        // alert();
        console.log(res);
      }).catch(err => {

      });
    }
  }

  getUserCheckIfIsInDb(data) {
    console.log(data);
    // let email = data['email'];
    // let firstname = data['given_name'];
    // let lastname = data['family_name'];

    // this.authServiceProvider.getUserByEmail('getUser', {email: email}).then(res => {
    //   if(res['isValidUser']) {
    //     this.authServiceProvider
    //   } else {

    //   }
    // }).catch(err => {
    //   console.log(JSON.stringify(err));
    // });
  }
}
