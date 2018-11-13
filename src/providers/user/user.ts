import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAPAM8MlcdkHBj9ZuL_q6kiZ0rovWcNNjU";

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  addItem(user: User){
    const itemsRef = this.db.list('users');
    
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.URL, { email:user.email, password: user.password, returnSecureToken: true  })
      .subscribe( d => {
        console.log(d);
        const k = itemsRef.push({name:user.name,email:user.email, isAdmin: user.isAdmin, isStudent: user.isStudent}).key;
        resolve(k);
      }, (error) => {
        reject(error);
      })
    });
    
    return promise;
  }

}
