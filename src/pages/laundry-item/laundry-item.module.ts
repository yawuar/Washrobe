import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaundryItemPage } from './laundry-item';

@NgModule({
  declarations: [
    LaundryItemPage,
  ],
  imports: [
    IonicPageModule.forChild(LaundryItemPage),
  ],
})
export class LaundryItemPageModule {}
