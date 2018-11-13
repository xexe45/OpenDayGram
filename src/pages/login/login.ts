import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { AuthProvierProvider } from '../../providers/auth-provier/auth-provier';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  app_name = 'OpenDayGram';

  credentials: any = {
    email: null,
    password: null
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private _auth: AuthProvierProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  registrarme($e){
    $e.preventDefault();
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  login(){
    if(!this.credentials.email && !this.credentials.password){
      return;
    }
    const loader = this.loadingCtrl.create({
      content: "Verificando Credenciales...",
    });

    loader.present();

    this._auth.signIn(this.credentials.email, this.credentials.password)
      .then( d => {
        loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch( error => {
        console.log(error);
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Ooooops!',
          subTitle: 'Credenciales Incorrectas',
          buttons: ['OK']
        });
        alert.present();
      })
    
  }

}
