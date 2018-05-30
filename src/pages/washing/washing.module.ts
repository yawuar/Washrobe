import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WashingPage } from './washing';

@NgModule({
  declarations: [
    WashingPage,
  ],
  imports: [
    IonicPageModule.forChild(WashingPage),
  ],
})
export class WashingPageModule {}
