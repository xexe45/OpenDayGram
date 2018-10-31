import { Period } from './../../models/Period.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import { PeriodProvider } from '../../providers/period/period';
import { Periodo } from '../../interfaces/period.interface';

/**
 * Generated class for the PeriodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-periodos',
  templateUrl: 'periodos.html',
})
export class PeriodosPage {
  option = 'insert';

  periodo: Periodo = {
    name: null,
    status: true,
    date: Date.now(),
    key: null
  }
  
  periods : Period[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _periodProvider: PeriodProvider,
              public loadingCtrl: LoadingController) {
              const loader = this.loadingCtrl.create({
                  content: "Espere un momento porfavor...",
                });
              loader.present();

              this._periodProvider.items.subscribe( data => {
                this.periods = data.reverse() ;
                loader.dismiss();
                this.isActivate();
              } )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeriodosPage');
    
  }
  
  itemSelected(item){
    console.log(item);
  }

  save()
  {
    const loader = this.loadingCtrl.create({
      content: "Espere un momento porfavor...",
    });

    loader.present();

    const periodo = new Period(this.periodo.key, this.periodo.name, this.periodo.status,this.periodo.date);

    if(this.option == 'insert'){
      this._periodProvider.addItem(periodo)
        .then( () => {
          
          loader.dismiss();
          
          this.periodo = {
            name: null,
            status: true,
            date: Date.now(),
            key: null
          }
        })
        .catch(err => {
          console.log(err);
          loader.dismiss();
        })
    }else if(this.option == 'update'){
      this._periodProvider.update(this.periodo.key,periodo)
        .then( () => {
          console.log();
          loader.dismiss();
      
          this.periodo = {
            name: null,
            status: true,
            date: Date.now(),
            key: null
          }
          this.option = 'insert';
        })  
    }
    
  }
  editar(periodo: Periodo){
    this.option = 'update';
    this.periodo = periodo;
  }
  changeStatus(periodo: Period){
    const k = periodo.key;
    this._periodProvider.updateStatus(k,periodo)
      .then( () => console.log() )
  }

  isActivate()
  {
    for (const periodo of this.periods) {
      if(periodo.status){
        return true;
      }
    }
    return false;
  }

  finalActivate()
  {
    if(this.isActivate() && this.option === 'insert')
    {
      return true;
    }else{
      return false;
    }
  }
}
