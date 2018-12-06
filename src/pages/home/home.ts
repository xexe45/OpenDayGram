import { PostProvider } from './../../providers/post/post';
import { Component } from '@angular/core';
import { NavController, App,ModalController,AlertController  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvierProvider } from '../../providers/auth-provier/auth-provier';
import { UserProvider } from '../../providers/user/user';
import { PublicacionPage } from '../publicacion/publicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  app_name = 'OpenDayGram';
  posts: any[] = [];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private _authProvider: AuthProvierProvider,
              private _userProvider: UserProvider,
              private _postProvider: PostProvider,
              private app:App) {

                this._postProvider.posts.subscribe( data => {
                  this.posts = data.reverse();
                  
                } )

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
              .catch(err => console.log(err))
            
          }
        }
      ]
    });
    confirm.present();
    
  }

  verPub(publicacion: any){
    const modal = this.modalCtrl.create(PublicacionPage, {publicacion: publicacion});
    modal.present();
  }

}
