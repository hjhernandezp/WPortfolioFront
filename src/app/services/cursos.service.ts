import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cursos } from '../models/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  URLcur = environment.URL + '/cursos';

  constructor(private httpx: HttpClient) { }

  public lista(): Observable<Cursos[]> {
    return this.httpx.get<Cursos[]>(this.URLcur + '/lista');
  }

  public detail(id: number): Observable<Cursos> {
    return this.httpx.get<Cursos>(this.URLcur + `/detail/${id}`);
  }

  public save(cursos: Cursos): Observable<any> {
    return this.httpx.post<any>(this.URLcur + '/create', cursos);
  }

  public update(id: number, cursos: Cursos): Observable<any> {
    return this.httpx.put<any>(this.URLcur + `/update/${id}`, cursos);
  }

  public delete(id: number): Observable<any> {
    return this.httpx.delete<any>(this.URLcur + `/delete/${id}`);
  }
}
