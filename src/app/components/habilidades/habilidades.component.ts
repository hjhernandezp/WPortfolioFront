import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Habilidades } from 'src/app/models/habilidades';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  
  //ARREGLO Y OBJETO
  arreglo: Habilidades[] = [];
  objeto: Habilidades = null;

  //DATOS
  nombre: string;
  nivel: number;

  //HABILITANTE
  isLogged = false;

  constructor(
    private SerComponent: HabilidadesService, 
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
    this.nombre = null;
    this.nivel = null;
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
    const habilidades = new Habilidades(
      this.nombre, 
      this.nivel
    );
    this.SerComponent.save(habilidades).subscribe(
      data => {
        this.onLoad()
        this.onReset()
        alert("Registro añadido correctamente en: Habilidades")
      }, err=> {
        alert("Error de sistema al añadir: Habilidades")
      }
    );
  }

  onUpdate(id: number): void {
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onLoad()
        alert("Registro actualizado en: Habilidades")
      }, err => {
        alert("Error de sistema al editar: Habilidades")
      }
    );
  }

  onDelete(id: number): void {
    if(id != undefined) {
      if(window.confirm("¿Desea borrar el registro?")) {
        this.SerComponent.delete(id).subscribe(
          data => {
            this.onLoad()
            alert("Registro eliminado en: Habilidades")
          }, err => {
            alert("Error de sistema al borrar: Habilidades")
          }
        );
      }
    }
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }
}
