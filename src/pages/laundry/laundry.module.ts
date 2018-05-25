import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaundryPage } from './laundry';

@NgModule({
  declarations: [
    LaundryPage,
  ],
  imports: [
    IonicPageModule.forChild(LaundryPage),
  ],
})
export class LaundryPageModule {}
