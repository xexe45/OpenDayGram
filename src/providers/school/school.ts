
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from './../../models/School.model';
/*
  Generated class for the SchoolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchoolProvider {

  constructor(private db: AngularFireDatabase) {
   
  }

  addItem(school: School){
    const itemsRef = this.db.list('schools');
    const k = itemsRef.push(school).key;

    const promise = new Promise((resolve, reject) => {
      if(k.length > 0){
        resolve();
      }else{
        reject();
      }
    });
    return promise;
  }

  getSchoolsThisPeriod(period)
  {
    const itemsRef = this.db.list('schools', ref => ref.orderByChild('period_key').equalTo(period));
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return items;
  }

  update(key: string,school: School) {
    const itemsRef = this.db.list('schools');
    // to get a key, check the Example app below
    return itemsRef.update(key, school);
  }

}
