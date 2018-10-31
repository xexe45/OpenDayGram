import { PeriodProvider } from './../../providers/period/period';
import { Period } from './../../models/Period.model';
import { ColegiosPage } from './../colegios/colegios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the PeriodosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-periodos-list',
  templateUrl: 'periodos-list.html',
})
export class PeriodosListPage {
  
  periodos: Period[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _periodoProvider: PeriodProvider,
              public loadingCtrl: LoadingController) {

              const loader = this.loadingCtrl.create({
                  content: "Espere un momento porfavor...",
                });
              loader.present();
              this._periodoProvider.items.subscribe( data => {
                console.log(data);
                this.periodos = data.reverse();
                loader.dismiss();
                console.log(this.periodos);
              } )
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodosListPage');
  }

  itemSelected(periodo)
  {
    this.navCtrl.push(ColegiosPage, { periodo })
  }

}
