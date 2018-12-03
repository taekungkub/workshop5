import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatPage } from './wat';

@NgModule({
  declarations: [
    WatPage,
  ],
  imports: [
    IonicPageModule.forChild(WatPage),
  ],
})
export class WatPageModule {}
