import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {
  
  postRef: AngularFireList<any>;
  posts: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.postRef = this.db.list('posts');
    // Use snapshotChanges().map() to store the key
    this.posts = this.postRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addItem(post: any){

    //return this.db.object(`/posts/${post.key}`).update(post);
    const k = this.postRef.push(post).key;
    const promise = new Promise((resolve, reject) => {
      if(k.length > 0){
        resolve();
      }else{
        reject();
      }
    });
    return promise;
    
  }

}
