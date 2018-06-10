import { Component, Renderer } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {

  text: string;

  public days: any = [];
  public currentDay: any = new Date();
  public currentSelected: Number = 0;
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

  constructor(private renderer: Renderer, private viewCtrl: ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'calendar', true);
    this.getCurrentWeek();
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

}
