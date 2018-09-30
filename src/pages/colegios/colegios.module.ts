import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColegiosPage } from './colegios';

@NgModule({
  declarations: [
    ColegiosPage,
  ],
  imports: [
    IonicPageModule.forChild(ColegiosPage),
  ],
})
export class ColegiosPageModule {}
