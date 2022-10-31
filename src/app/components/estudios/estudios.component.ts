import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudios } from 'src/app/models/estudios';
import { EstudiosService } from 'src/app/services/estudios.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  
  constructor(
    private SerComponent: EstudiosService, 
    private SerToken: TokenService,
    private SerModal: NgbModal
  ) { }
  
  //ARREGLO Y OBJETO
  arreglo: Estudios[] = [];
  objeto: Estudios = null;
  
  //DATOS
  carrera: string;
  mencion: string;
  estado: string;
  instituto: string
  lugar: string;

  //HABILITANTE
  isLogged = false;

  ngOnInit(): void {
    this.onLoad();
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
    this.carrera = null;
    this.mencion = null;
    this.estado = null;
    this.instituto = null;
    this.lugar = null;
  }

  onLocate(id: number, guia: any) {
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
    const estudios = new Estudios(
      this.carrera, 
      this.mencion,
      this.estado,
      this.instituto,
      this.lugar
    );
    this.SerComponent.save(estudios).subscribe(
      data => {
        this.onLoad()
        this.onReset()
        alert("Registro añadido correctamente en: Estudios")
      }, err=> {
        alert("Error de sistema al añadir: Estudios")
      }
    );
  }

  onUpdate(id: number): void {
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onLoad()
        alert("Registro actualizado en: Estudios")
      }, err => {
        alert("Error de sistema al editar: Estudios")
      }
    );
  }

  onDelete(id: number): void {
    if(id != undefined) {
      if(window.confirm("¿Desea borrar el registro?")) {
        this.SerComponent.delete(id).subscribe(
          data => {
            this.onLoad()
            alert("Registro eliminado en: Estudios")
          }, err => {
            alert("Error de sistema al borrar: Estudios")
          }
        );
      }  
    }
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }
}
