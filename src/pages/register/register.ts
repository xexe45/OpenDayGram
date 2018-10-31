import { SchoolProvider } from './../../providers/school/school';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PeriodProvider } from '../../providers/period/period';
import { School } from '../../models/School.model';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  app_name = 'OpenDayGram';
  periodoActual:any = {};
  colegios: any[] = [];
  gaming = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private _periodProvide: PeriodProvider,
              private _schoolProvider: SchoolProvider) {

                  this.getSchools();
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  iniciar($e){
    $e.preventDefault();
    this.viewCtrl.dismiss();
  }

  getSchools()
  {
    this._periodProvide.getActualPeriod()
                  .subscribe( data => { 
                    this.periodoActual = data[0];
                    this._schoolProvider.getSchoolsThisPeriod(this.periodoActual.key)
                      .subscribe(colegios => this.colegios = colegios )
                  } );
  }

  registrar()
  {
    console.log(this.gaming);
  }

}
