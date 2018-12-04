
import { Component } from '@angular/core';
import { NavController, Platform,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { Post } from '../../models/Post.model';
import { UserProvider } from '../../providers/user/user';
import { AuthProvierProvider } from '../../providers/auth-provier/auth-provier';
import { PostProvider } from '../../providers/post/post';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  app_name = 'OpenDayGram';
  
  imagen: string = null;
  imagen64:string = null;
  descripcion: string = null;

  constructor(public navCtrl: NavController,
              public _cargaArchivo: CargaArchivoProvider,
              public _userProvider: UserProvider,
              public _auth: AuthProvierProvider,
              private _postProvider:PostProvider,
              public toastCtrl: ToastController,
              public platform: Platform,
              private camera: Camera) {

  }

  takePicture()
  {
    if(this.platform.is('cordova'))
    {
      const options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.imagen = base64Image;
       this.imagen64 = imageData;
      }, (err) => {
       // Handle error
       console.error("Error en la cámara", err);
      });
    }else{
      console.log('No permited');
    }
  }

  crearPost(){
    this._userProvider.userLogged(this._auth.user.uid)
      .subscribe( (usuario: any) => {
        const hoy = new Date();
        const post = new Post(usuario[0].key, usuario[0].name,hoy.toString(),this.imagen64,this.descripcion, null);
        this._cargaArchivo.cargar_imagen_firebase(post)
          .then( (envio: any) => {
            this.subirPost(post,envio.url, envio.nombreArchivo)
          })
      } )
  }

  private subirPost(post: Post, url: string, nombreArchivo: string){
  
    let subir: any = {
      user_id: post.user_id,
      user: post.user,
      date: post.date,
      img: url,
      description: post.description,
      archivo: nombreArchivo
    };
    
    this._postProvider.addItem(subir)
      .then( () => {
        this.mostrarToast("Publicación creada");
        this.imagen = null;
        this.imagen64 = null;
        this.descripcion = null;
      } )
      .catch( (e)  => this.mostrarToast(e))

}

mostrarToast(mensaje: string){
  let toast = this.toastCtrl.create({
    message: mensaje,
    duration: 2000
  }).present();
}

  

}
