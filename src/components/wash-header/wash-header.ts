import { Component, Input } from '@angular/core';

/**
 * Generated class for the WashHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wash-header',
  templateUrl: 'wash-header.html'
})
export class WashHeaderComponent {

  @Input('name') name;
  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.name);
  }

}
