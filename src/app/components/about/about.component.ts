import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models/persona';
import { ImageService } from 'src/app/services/image.service';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  constructor(
    private SerComponent: PersonaService, 
    private SerActivated: ActivatedRoute,
    private SerToken: TokenService,
    private SerModal: NgbModal,
    public SerImage: ImageService
  ) { }
  
  //ARREGLO Y OBJETO
  arreglo: Persona[] = [];
  objeto: Persona = null;

  //HABILITANTE
  isLogged = false;

  ngOnInit(): void {
    this.onDetail();
    if(this.SerToken.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  
 onDetail() {
    this.SerComponent.detail(1).subscribe(
      data => {
        this.objeto = data
      }
    );
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

  onUpdate(id: number): void {
    this.objeto.imagen = this.SerImage.url
    this.SerComponent.update(id, this.objeto).subscribe(
      data => {
        this.onDetail()
        alert("Registro actualizado en: Persona")
      }, err => {
        alert("Error de sistema al editar: Persona")
      }
    );
  }

  onModal(guia: any): void {
    this.SerModal.open(guia)
  }

  onImage($event: any, id: number): void {
    this.SerImage.uploadImage($event, 'perfil_' + id )
  }
}
