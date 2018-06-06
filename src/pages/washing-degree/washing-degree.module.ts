import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WashingDegreePage } from './washing-degree';

@NgModule({
  declarations: [
    WashingDegreePage,
  ],
  imports: [
    IonicPageModule.forChild(WashingDegreePage),
  ],
})
export class WashingDegreePageModule {}
