import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeriodosPage } from '../periodos/periodos';
import { PeriodosListPage } from '../periodos-list/periodos-list';
import { UsersPage } from '../users/users';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  
  periodos()
  {
    this.navCtrl.push(PeriodosPage);
  }

  periodosList()
  {
    this.navCtrl.push(PeriodosListPage);
  }

  users()
  {
    this.navCtrl.push(UsersPage);
  }
}
