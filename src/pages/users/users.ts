import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
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
              }
          })
          .catch(err => {
            console.log(err);
            loader.dismiss();
              
              
          })
  }

}
