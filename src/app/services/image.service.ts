import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  carpeta: string = 'imagenes/';
  url: string = "";
  
  constructor(private storage: Storage) { }

  public uploadImage($event: any, nombre: string): void {
    const archivo = $event.target.files[0];
    const referencia = ref(this.storage, this.carpeta + nombre);
    uploadBytes(referencia, archivo) 
    .then(response => {this.getImage(this.carpeta)})
    .catch(error => console.log(error))
  }

  getImage(carpeta: string): void {
    const imagenes = ref(this.storage, carpeta);
    list(imagenes)
    .then(async response => {
      for(let item of response.items) {
        this.url = await getDownloadURL(item)
      }
    })
    .catch(error => console.log(error))
  }
}
