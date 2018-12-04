import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';
import { PostProvider } from '../post/post';

/*
  Generated class for the CargaArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaArchivoProvider {

  constructor(public toastCtrl: ToastController,
              public _postProvider: PostProvider,) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase(post: Post)
  {
      let promise = new Promise( (resolve, reject) => {
        
        this.mostrarToast("Cargando...");

        let storeRef = firebase.storage().ref();
        let nombreArchivo = new Date().valueOf().toString();
        
        let uploadTask: firebase.storage.UploadTask = 
            storeRef.child(`post/${nombreArchivo}`)
                    .putString(post.image, 'base64', {contentType: 'image/jpeg'})
            
            uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                          console.log('Upload is paused');
                          break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                          console.log('Upload is running');
                          break;
                      }
                    }, function(error) {
                      // Handle unsuccessful uploads
                      console.log("Error en la carga");
                      console.log(JSON.stringify(error));
                      console.log(JSON.stringify(error));
                      reject();
                    }, function() {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('Archivo Subido');
                        let url = downloadURL;
                        console.log(url);
                        //this.subirPost(post, url, nombreArchivo);
                        console.log("Imagen Cargada Correctamente");
                        let envio = {
                          url: url,
                          nombreArchivo: nombreArchivo
                        }
                        resolve(envio);
                      });
                    });
      });

      return promise;

  }

subirPost(post: Post, url: string, nombreArchivo: string){
  
    let subir: any = {
      user_id: post.user_id,
      user: post.user,
      date: post.date,
      img: url,
      description: post.description,
      archivo: nombreArchivo
    };
    
    this._postProvider.addItem(subir)
      .then( () => this.mostrarToast("Publicación creada") )
      .catch( (e)  => this.mostrarToast(e))

}

  
  mostrarToast(mensaje: string){
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }

}


interface Post{
  user_id: string;
  user: string;
  date: string;
  image: string;
  description: string;
  key?: string;
}
