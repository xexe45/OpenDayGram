import { HomePage } from './../home/home';
import { Student } from './../../models/Student.model';
import { AuthProvierProvider } from './../../providers/auth-provier/auth-provier';
import { SchoolProvider } from './../../providers/school/school';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController  } from 'ionic-angular';
import { PeriodProvider } from '../../providers/period/period';
import { User } from '../../models/User.model';
import { UserProvider } from '../../providers/user/user';
import { StudentProvider } from '../../providers/student/student';
import { TabsPage } from '../tabs/tabs';


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
 
  register = {
    name: null,
    apellidos: null,
    school: '',
    email: null,
    password: null,
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              private _periodProvide: PeriodProvider,
              private _schoolProvider: SchoolProvider,
              private _authProvider: AuthProvierProvider,
              private _userProvider: UserProvider,
              private _studentProvider: StudentProvider) {

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
    const loader = this.loadingCtrl.create({
      content: "Cargando Colegios...",
    });
    loader.present();
    this._periodProvide.getActualPeriod()
                  .subscribe( data => { 
                    this.periodoActual = data[0];
                    this._schoolProvider.getSchoolsThisPeriod(this.periodoActual.key)
                      .subscribe(colegios => {
                        this.colegios = colegios
                        console.log(this.colegios);
                        loader.dismiss();
                      } )
                  } );
  }

  registrar()
  {
    let nombre = `${this.register.name} ${this.register.apellidos}`;
    const user = new User(null, nombre, null, false, true, this.register.email, this.register.password);
    this._authProvider.signUp(user)
      .then( response => {
        console.log(response);
        this._userProvider.adduserStudent(user, response.user.uid)
          .then( (r: any) => {
              const student = new Student(r, this.register.school);
              this._studentProvider.adduserStudent(student)
                .then( kl => {
                  this.navCtrl.setRoot(TabsPage);
                })
          } )
      })
      .catch( err => {
        console.log(err);
      } )
  }

}
