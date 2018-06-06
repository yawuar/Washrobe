import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WashingMaterialPage } from './washing-material';

@NgModule({
  declarations: [
    WashingMaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(WashingMaterialPage),
  ],
})
export class WashingMaterialPageModule {}
