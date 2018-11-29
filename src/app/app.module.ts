import { UsersPage } from './../pages/users/users';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PeriodosPage } from '../pages/periodos/periodos';
import { PeriodosListPage } from '../pages/periodos-list/periodos-list';
import { ColegiosPage } from '../pages/colegios/colegios';

/**ANGULAR FIRE */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PeriodProvider } from '../providers/period/period';
import { SchoolProvider } from '../providers/school/school';
import { UserProvider } from '../providers/user/user';
import { AuthProvierProvider } from '../providers/auth-provier/auth-provier';
import { StudentProvider } from '../providers/student/student';

//Native
import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
    apiKey: "AIzaSyAPAM8MlcdkHBj9ZuL_q6kiZ0rovWcNNjU",
    authDomain: "heroesapp-1ab0c.firebaseapp.com",
    databaseURL: "https://heroesapp-1ab0c.firebaseio.com",
    projectId: "heroesapp-1ab0c",
    storageBucket: "heroesapp-1ab0c.appspot.com",
    messagingSenderId: "330674308169"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    PeriodosPage,
    PeriodosListPage,
    ColegiosPage,
    UsersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    PeriodosPage,
    PeriodosListPage,
    ColegiosPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PeriodProvider,
    SchoolProvider,
    UserProvider,
    AuthProvierProvider,
    StudentProvider,
    Camera
  ]
})
export class AppModule {}
