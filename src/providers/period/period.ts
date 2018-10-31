import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Period } from './../../models/Period.model';
/*
  Generated class for the PeriodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeriodProvider {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {

    this.itemsRef = this.db.list('periods');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    
  }

  addItem(periodo: Period){

    const k = this.itemsRef.push(periodo).key;
    const promise = new Promise((resolve, reject) => {
      if(k.length > 0){
        resolve();
      }else{
        reject();
      }
    });
    return promise;
  }

  update(key: string,periodo: Period) {
    return this.itemsRef.update(key, { name: periodo.name ,status: periodo.status });
  }

  updateStatus(key: string,periodo: Period) {
    return this.itemsRef.update(key, { status: !periodo.status });
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  getActualPeriod()
  {
    const itemsRef = this.db.list('periods', ref => ref.orderByChild('status').equalTo(true));
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return items;
  }

}
