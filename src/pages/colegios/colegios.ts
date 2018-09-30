import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ColegiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-colegios',
  templateUrl: 'colegios.html',
})
export class ColegiosPage {
  periodo = null;
  colegios = [
    {
     name: 'Santa María',
     active: false
    },
   {  
     name: 'Lourdes',
     active: true
   }
 ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.periodo = this.navParams.get('periodo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegiosPage');
  }

}
