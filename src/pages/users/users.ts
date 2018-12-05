import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { User } from '../../models/User.model';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  user: any = {
    key: null,
    name: null, 
    picture: null,
    isAdmin: true,
    isStudent: false,
    email: null,
    password: null
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private _userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  save(){

    const loader = this.loadingCtrl.create({
      content: "Espere un momento porfavor...",
    });

    loader.present();

    const user = new User(this.user.key,this.user.name,
                          this.user.picture,this.user.isAdmin,
                          this.user.isStudent,this.user.email,
                          this.user.password);
    
    this._userProvider.addItem(user)
          .then( () => { 
            loader.dismiss();
                            
            this.user = {
                key: null,
                name: null, 
                picture: null,
                isAdmin: true,
                isStudent: false,
                email: null,
                password: null
              };
          
          this.showAlert('Correcto!','Usuario de tipo administrador creado correctamente');
          })
          .catch(err => {
            console.log(err.error.error.message);
            loader.dismiss();
            this.showAlert('Ooooops',err.error.error.message);  
              
          })
  }

  private showAlert(title: string, text: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
