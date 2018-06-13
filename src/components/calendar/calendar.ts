import { Component, Renderer } from "@angular/core";
import { ViewController } from "ionic-angular";
import { CalendarServiceProvider } from "../../providers/calendar-service/calendar-service";

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "calendar",
  templateUrl: "calendar.html"
})
export class CalendarComponent {
  text: string;

  private token;
  public days: any = [];
  public currentDay: any = new Date();
  public itemByDay: any = [];
  public currentSelected: Number = 0;
  public data: any;
  public typeOfClothes: any = [
    { id: 8, class: 'jacket', data: [] },
    { id: 1, class: 'tshirt', data: [] },
    { id: 6, class: 'sweater', data: [] },
    { id: 2, class: 'pants', data: [] }
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

  constructor(private renderer: Renderer, private viewCtrl: ViewController, private calendarServiceProvider: CalendarServiceProvider) {
    this.renderer.setElementClass(
      viewCtrl.pageRef().nativeElement,
      "calendar",
      true
    );
    this.token = JSON.parse(localStorage.getItem("currentUser"))["token"];
    this.getCurrentWeek();
    this.getClothesByCurrentDay();
    this.data = {
      user_itemID: this.viewCtrl.data['uiID'],
      categoryID: this.viewCtrl.data['cID']
    };
  }

  getCurrentWeek() {
    let amountDays = 7;
    let current = new Date();
    let index = current.getDate() - current.getDay();

    for (let i = 0; i < amountDays; i++) {
      if (this.currentDay.getTime() === new Date(current.setDate(index)).getTime()) {
        this.currentSelected = i;
      }
      this.days.push(new Date(current.setDate(index)));
      index += 1;
    }
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
        console.log(JSON.stringify(err));
      });
  }

  remove(data) {
    let body = {
      user_itemID: data[0].pivot.id,
      date: this.formatDay(this.currentDay)
    };
    console.log(body);
    this.calendarServiceProvider.removeItemOfCalendar(this.token, 'calendar/item/remove', body).then(res => {
      console.log(JSON.stringify(res));
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }

  getClothesByCurrentDay() {
    this.showClothesByDay(this.currentSelected, this.currentDay);
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
    let n = this.currentSelected;
    let date = this.formatDay(this.days[n.toFixed()]);
    this.calendarServiceProvider.addItemInCalendar(this.token, 'calendar', {
      user_itemID: id,
      date: date
    }).then(res => {
      console.log(JSON.stringify(res));
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }

  close() {
    console.log('boem');
  }
}
