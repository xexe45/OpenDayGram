import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { AuthProvierProvider } from '../../providers/auth-provier/auth-provier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  app_name = 'OpenDayGram';
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private _authProvider: AuthProvierProvider,
              private app:App) {

                console.log(_authProvider.user);

  }

  salir(){
    const confirm = this.alertCtrl.create({
      title: this.app_name,
      message: `¿Desea salir de ${this.app_name}?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            this._authProvider.signOut()
              .then( () => this.app.getRootNav().setRoot(LoginPage))
            
          }
        }
      ]
    });
    confirm.present();
    
  }

}
