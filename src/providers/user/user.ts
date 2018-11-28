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
      .subscribe( (d: any) => {
        console.log(d);
        const k = itemsRef.push({name:user.name,email:user.email, isAdmin: user.isAdmin, isStudent: user.isStudent, user_id: d.localId}).key;
        resolve(k);
      }, (error) => {
        reject(error);
      })
    });
    
    return promise;
  }

  adduserStudent(user: User, key: string){
    const itemsRef = this.db.list('users');
    const promise = new Promise((resolve, reject) => {
        
      const k = itemsRef.push({name:user.name,email:user.email, isAdmin: user.isAdmin, isStudent: user.isStudent, user_id: key}).key;

      if(k.length > 0){
        resolve(k)
      }else{
        reject("Error");
      }
        
    });
    
    return promise;
  }

  userLogged(uid: string)
  {
    const itemsRef = this.db.list('users', ref => ref.orderByChild('user_id').equalTo(uid));
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return items;
  }

}
