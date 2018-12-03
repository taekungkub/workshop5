import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatdetailsPage } from './watdetails';

@NgModule({
  declarations: [
    WatdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WatdetailsPage),
  ],
})
export class WatdetailsPageModule {}
