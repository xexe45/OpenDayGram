import { AuthProvierProvider } from './../../providers/auth-provier/auth-provier';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController  } from 'ionic-angular';
import { Like } from '../../models/Like.model';
import { LikeProvider } from '../../providers/like/like';

/**
 * Generated class for the PublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {
  publicacion: any = {};
  likes: Like[] = [];
  countLikes: number = 0;
  iLike: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private _userProvider: UserProvider,
              private _authProvider: AuthProvierProvider,
              private _likeProvider: LikeProvider) {

                this.publicacion = this.navParams.get('publicacion');
                this._likeProvider.likesByPub(this.publicacion.key)
                  .subscribe( (likes: any) => {
                    this.likes = likes;
                    this.countLikes = this.likes.length;
                    this._userProvider.userLogged(this._authProvider.user.email)
                      .subscribe( us => {
                        const k = `${this.publicacion.key}${us[0].key}`;
                        this._likeProvider.myLike(k)
                          .subscribe( l => {
                            if(l.length > 0){
                              this.iLike = true;
                            }else{
                              this.iLike = false;
                            }
                            console.log(this.iLike);
                          } )
                      })
                  } )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacionPage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  like(key: string){
    
    const loader = this.loadingCtrl.create({
      content: "Espere un momento porfavor...",
    });
    loader.present();

    this._userProvider.userLogged(this._authProvider.user.email)
      .subscribe( user => {
        const keys = `${key}${user[0].key}`;
        const like = new Like(null, key, user[0].key,keys);
        this._likeProvider.newLike(like)
          .then( () => {
            loader.dismiss();
            this.presentToast('Like Agregado');
          })
          .catch( err => {
            loader.dismiss();
            this.presentToast('No se pudo agregar el like');
          } )
      } )
    
  }

  private presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
