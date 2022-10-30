import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyectos } from 'src/app/models/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  //ARREGLO Y OBJETO
  arreglo: Proyectos[] = [];
  objeto: Proyectos = null;
  
  //DATOS
  nombre: string;
  descripcion: string;
  enlace: string;
  imagen: string;

  //HABILITANTE
  isLogged = false;

  constructor(
    private SerComponent: ProyectosService, 
    private SerToken: TokenService,
    private SerModal: NgbModal,
    public SerImagen: ImageService
  ) { }

  ngOnInit(): void {
    this.onLoad()
    if(this.SerToken.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLoad(): void {
    this.SerComponent.lista().subscribe(
      data => {
        this.arreglo = data
      }
    );
  }

  onReset(): void {
    this.nombre = null;
    this.descripcion = null;
    this.enlace = null;
    this.imagen = null;
  }

  onLocate(id: number, guia: any): void {
    this.SerComponent.detail(id).subscribe(
      data => {
        this.objeto = data
      }, err => {
        alert("Error de sistema")
      }
    )
    this.SerModal.open(guia)
  }

  onCreate(): void {
    const proyectos = new Proyectos(
      this.nombre, 
      this.descripcion,
      this.enlace,
      this.imagen
    );
    this.SerComponent.save(proyectos).subscribe(
      data => {
        this.onLoad()
        this.onReset()
        alert("Registro añadido correctamente en: Proyectos")
      }, err=> {
        alert("Error de sistema al añadir: Proyectos")
      }
    );
  }

  onUpdate(id: number): void {
    this.objeto.imagen = this.SerImagen.url;
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onLoad()
        alert("Registro actualizado en: Proyectos")
      }, err => {
        alert("Error de sistema al editar: Proyectos")
      }
    );
  }

  onDelete(id: number): void {
    if(id != undefined) {
      if(window.confirm("¿Desea borrar el registro?")) {
        this.SerComponent.delete(id).subscribe(
          data => {
            this.onLoad()
            alert("Registro eliminado en: Proyectos")
          }, err => {
            alert("Error de sistema al borrar: Proyectos")
          }
        );
      }  
    }
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }

  onImage($event: any): void {
    const archivo = $event.target.files[0];
    this.SerImagen.uploadImage($event, archivo.name); 
  }
}
