import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  //ARREGLO Y OBJETO
  arreglo: Experiencia[] = [];
  objeto: Experiencia = null;
  
  //DATOS
  empresa: string;
  lugar: string;
  cargo: string;

  //HABILITANTE
  isLogged = false;

  constructor(
    private SerComponent: ExperienciaService, 
    private SerToken: TokenService,
    private SerModal: NgbModal
  ) { }

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
    this.empresa = null;
    this.lugar = null;
    this.cargo = null;
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
    const experiencia = new Experiencia(
      this.empresa, 
      this.lugar,
      this.cargo
    );
    this.SerComponent.save(experiencia).subscribe(
      data => {
        this.onLoad()
        this.onReset()
        alert("Registro añadido correctamente en: Experiencia")
      }, err=> {
        alert("Error de sistema al añadir: Experiencia")
      }
    );
  }

  onUpdate(id: number): void {
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onLoad()
        alert("Registro actualizado en: Experiencia")
      }, err => {
        alert("Error de sistema al editar: Experiencia")
      }
    );
  }

  onDelete(id: number): void {
    if(id != undefined) {
      if(window.confirm("¿Desea borrar el registro?")) {
        this.SerComponent.delete(id).subscribe(
          data => {
            this.onLoad()
            alert("Registro eliminado en: Experiencia")
          }, err => {
            alert("Error de sistema al borrar: Experiencia")
          }
        );
      }
    }
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }
}
