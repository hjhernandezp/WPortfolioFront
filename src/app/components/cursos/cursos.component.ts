import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cursos } from 'src/app/models/cursos';
import { CursosService } from 'src/app/services/cursos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  
  constructor(
    private SerComponent: CursosService, 
    private SerToken: TokenService,
    private SerModal: NgbModal
  ) { }
  
  //ARREGLO Y OBJETO
  arreglo: Cursos[] = [];
  objeto: Cursos = null;
  
  //DATOS
  nombre: string;
  instituto: string;
  lugar: string
  horas: number;

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
    this.nombre = null;
    this.instituto = null;
    this.lugar = null;
    this.horas = null;
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
    const cursos = new Cursos(
      this.nombre, 
      this.instituto,
      this.lugar,
      this.horas
    );
    this.SerComponent.save(cursos).subscribe(
      data => {
        this.onLoad()
        this.onReset()
        alert("Registro añadido correctamente en: Cursos")
      }, err=> {
        alert("Error de sistema al añadir: Cursos")
      }
    );
  }

  onUpdate(id: number): void {
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onLoad()
        alert("Registro actualizado en: Cursos")
      }, err => {
        alert("Error de sistema al editar: Cursos")
      }
    );
  }

  onDelete(id: number): void{
    if(id != undefined) {
      if(window.confirm("¿Desea borrar el registro?")) {
        this.SerComponent.delete(id).subscribe(
          data => {
            this.onLoad()
            alert("Registro eliminado en: Cursos")
          }, err => {
            alert("Error de sistema al borrar: Cursos")
          }
        );
      }
    }
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }
}
