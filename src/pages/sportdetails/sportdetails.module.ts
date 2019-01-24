import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportDetails } from './sportdetails';

@NgModule({
  declarations: [
    SportDetails,
  ],
  imports: [
    IonicPageModule.forChild(SportDetails),
  ],
})
export class SportdetailsPageModule {}
