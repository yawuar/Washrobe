import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CalendarServiceProvider } from "../../providers/calendar-service/calendar-service";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  private token;
  public days: any = [];
  public currentDay: any = new Date();
  public itemByDay: any = [];
  public currentSelected: Number = 0;
  public typeOfClothes: any = [
    { id: 1, class: 'tshirt', data: [] },
    { id: 6, class: 'sweater', data: [] },
    { id: 2, class: 'pants', data: [] },
    { id: 9, class: 'tshirt', data: [] }
  ];

  public months: any = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendarServiceProvider: CalendarServiceProvider
  ) {
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    if (this.navParams.get("data") != null) {
      this.currentDay = new Date(this.navParams.get("data"));
    }
    this.getCurrentWeek();
    this.getClothesByCurrentDay();
  }

  getCurrentWeek() {
    let amountDays = 7;
    let current = new Date();
    let index = current.getDate() - current.getDay();

    for (let i = 0; i < amountDays; i++) {
      this.days.push(new Date(current.setDate(index)));
      if (this.currentDay.getTime() === new Date(current.setDate(index)).getTime()) {
            this.currentSelected = i;
          }
      index += 1;
    }
  }

  getClothesByCurrentDay() {
    this.showClothesByDay(this.currentSelected, this.currentDay);
  }

  showClothesByDay(id, day) {
    this.currentSelected = id;
    this.itemByDay = [];
    this.calendarServiceProvider
      .getItemsByDay(this.token, "calendar/", this.formatDay(day))
      .then(result => {
        // if(result["data"].length > 0) {
          for(let type of this.typeOfClothes) {
            type.data = [];
            for(let res of result['data']) {
              if(type.id === res.categoryID) {
                type.data.push(res);
              }
            }
          }
        // }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }

  formatDay(day) {
    let year = day.getFullYear();
    let yy = year < 10 ? "0" + year : year;

    let monthIndex = day.getMonth() + 1;
    let mm = monthIndex < 10 ? "0" + monthIndex : monthIndex;

    let dayIndex = day.getDate();
    let dd = dayIndex < 10 ? "0" + dayIndex : dayIndex;

    return yy + "-" + mm + "-" + dd;
  }

  addItemToCalendar(id) {
    console.log(id);
  }
  
}
