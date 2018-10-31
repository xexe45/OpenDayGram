import { SchoolProvider } from './../../providers/school/school';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { School } from './../../models/School.model';
import { Schools } from '../../interfaces/school.interface';

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
  colegios: any[] = [];
  colegio: Schools = {
    key: null,
    period_key: null,
    name: null
  }
  option = 'insert';
  search = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public _schoolProvider: SchoolProvider) {

    this.periodo = this.navParams.get('periodo')
    this.initializeItems();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColegiosPage');
  }

  initializeItems(){
    this._schoolProvider.getSchoolsThisPeriod(this.periodo.key)
      .subscribe(data => {
        this.colegios = data;
      });
  }

  save()
  {
    const loader = this.loadingCtrl.create({
      content: "Espere un momento porfavor...",
    });

    loader.present();

    const colegio = new School(this.colegio.key, this.periodo.key, this.colegio.name);

    if(this.option === 'insert'){
      
      this._schoolProvider.addItem(colegio)
        .then( () => {
          loader.dismiss();
          this.colegio = {
            key: null,
            period_key: null,
            name: null
          }
        })
        .catch(err => {
          console.log(err);
          loader.dismiss();
        })
    }else if(this.option === "update"){
      this._schoolProvider.update(colegio.key, colegio)
      .then( () => {
        loader.dismiss();
        this.colegio = {
          key: null,
          period_key: null,
          name: null
        };
        this.option = "insert";
      })
      .catch(err => {
        console.log(err);
        loader.dismiss();
      })
    }
  }

  editar(school : School){
    this.option = "update";
    this.colegio = school;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
  
    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.colegios = this.colegios.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.initializeItems();
    }
  }

}
