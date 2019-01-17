import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TraveldetailsPage } from './traveldetails';

@NgModule({
  declarations: [
    TraveldetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TraveldetailsPage),
  ],
})
export class TraveldetailsPageModule {}
