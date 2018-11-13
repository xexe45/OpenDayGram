import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
/*
  Generated class for the AuthProvierProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvierProvider {
  user;
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.user = null;        
        return;
      }
      this.user = user;      
    });
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      //.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      //.then(res => console.log(res));
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
