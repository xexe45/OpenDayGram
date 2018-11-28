import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Student } from '../../models/Student.model';
/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentProvider {

  constructor(private db: AngularFireDatabase) {
    console.log('Hello StudentProvider Provider');
  }

  adduserStudent(student: Student){

    const itemsRef = this.db.list('students');
    const promise = new Promise((resolve, reject) => {
        
      const k = itemsRef.push({user_id: student.user_id, school_id: student.school_id}).key;

      if(k.length > 0){
        resolve(k)
      }else{
        reject("Error");
      }
        
    });
    
    return promise;
  }

}
