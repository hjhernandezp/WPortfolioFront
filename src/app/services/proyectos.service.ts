import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  URLService = environment.URL + '/proyectos';

  constructor(private httpx: HttpClient) { }

  public lista(): Observable<Proyectos[]> {
    return this.httpx.get<Proyectos[]>(this.URLService + '/lista');
  }

  public detail(id: number): Observable<Proyectos> {
    return this.httpx.get<Proyectos>(this.URLService + `/detail/${id}`);
  }

  public save(proyectos: Proyectos): Observable<any> {
    return this.httpx.post<any>(this.URLService + '/create', proyectos);
  }

  public update(id: number, proyectos: Proyectos): Observable<any> {
    return this.httpx.put<any>(this.URLService + `/update/${id}`, proyectos);
  }

  public delete(id: number): Observable<any> {
    return this.httpx.delete<any>(this.URLService + `/delete/${id}`);
  }
}
