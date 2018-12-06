import { Like } from './../../models/Like.model';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
/*
  Generated class for the LikeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikeProvider {
  
  constructor(private db: AngularFireDatabase) {
    console.log('Hello LikeProvider Provider');
  }

  newLike(like: Like){
    const likesRef = this.db.list('likes');

    const k = likesRef.push(like).key;

    const promise = new Promise((resolve, reject) => {
      if(k.length > 0){
        resolve();
      }else{
        reject();
      }
    });

    return promise;
  }

  likesByPub(key_pub: string)
  {
    const itemsRef = this.db.list('likes', ref => ref.orderByChild('post_id').equalTo(key_pub));
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    return items;
  }

  myLike(keys: string){
    const itemsRef = this.db.list('likes', ref => ref.orderByChild('keys').equalTo(keys));
    // Use snapshotChanges().map() to store the key
    const items = itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    return items;
  }

  deleteLike(key: string) {
    const itemsRef = this.db.list('likes');
    return itemsRef.remove(key)
  }

}
