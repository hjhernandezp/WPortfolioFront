import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URLper = environment.URL + '/persona';

  constructor(private httpx: HttpClient) { }

  public lista(): Observable<Persona[]> {
    return this.httpx.get<Persona[]>(this.URLper + '/lista');
  }

  public detail(id: number): Observable<Persona> {
    return this.httpx.get<Persona>(this.URLper + `/detail/${id}`);
  }

  public save(persona: Persona): Observable<any> {
    return this.httpx.post<any>(this.URLper + '/create', persona);
  }

  public update(id: number, persona: Persona): Observable<any> {
    return this.httpx.put<any>(this.URLper + `/update/${id}`, persona);
  }

  public delete(id: number): Observable<any> {
    return this.httpx.delete<any>(this.URLper + `/delete/${id}`);
  }
}
