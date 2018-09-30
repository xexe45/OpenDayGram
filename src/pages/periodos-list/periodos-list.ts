import { ColegiosPage } from './../colegios/colegios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  items = [
    {
     name: '2017',
     active: false
    },
   {  
     name: '2018',
     active: true
   }
 ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodosListPage');
  }

  itemSelected(item)
  {
    this.navCtrl.push(ColegiosPage, { periodo: item })
  }

}
