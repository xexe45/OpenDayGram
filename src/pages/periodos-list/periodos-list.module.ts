import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeriodosListPage } from './periodos-list';

@NgModule({
  declarations: [
    PeriodosListPage,
  ],
  imports: [
    IonicPageModule.forChild(PeriodosListPage),
  ],
})
export class PeriodosListPageModule {}
