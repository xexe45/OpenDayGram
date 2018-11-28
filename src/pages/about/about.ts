import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  app_name = 'OpenDayGram';
  
  imagen: string = null;
  constructor(public navCtrl: NavController,
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
      }, (err) => {
       // Handle error
       console.error("Error en la cámara", err);
      });
    }else{
      console.log('No permited');
    }
  }

}
