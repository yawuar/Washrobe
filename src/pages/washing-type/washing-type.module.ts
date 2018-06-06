import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WashingTypePage } from './washing-type';

@NgModule({
  declarations: [
    WashingTypePage,
  ],
  imports: [
    IonicPageModule.forChild(WashingTypePage),
  ],
})
export class WashingTypePageModule {}
