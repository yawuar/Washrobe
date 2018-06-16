import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { HomePage } from "../home/home";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-registration",
  templateUrl: "registration.html"
})
export class RegistrationPage {
  private registration: FormGroup;

  private loading: any;
  private data: any;
  public error: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authServiceProvider: AuthServiceProvider,
    private loadingController: LoadingController
  ) {
    this.registration = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      gender: ["", Validators.required],
      password: ["", Validators.required],
      c_password: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistrationPage");
  }

  register() {
    if (this.registration.value == undefined) {
      this.registration.value.gender = 1;
    }

    this.showLoader();
    this.authServiceProvider
      .register(this.registration.value, "register")
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
            this.error = err["error"];
            this.loading.dismiss();
          });
      });
  }

  showLoader() {
    this.loading = this.loadingController.create({
      content: "Register..."
    });
    this.loading.present();
  }

  test(event) {
    // if(event == undefined) {
    //   event = 1;
    // }
    // this.registration.get('gender').setValue(event);
    // console.log(event);
  }
}
