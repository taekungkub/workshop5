import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTabsPage } from './manage-tabs';

@NgModule({
  declarations: [
    ManageTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageTabsPage),
  ],
})
export class ManageTabsPageModule {}
