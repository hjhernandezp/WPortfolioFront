import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidades } from '../models/habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {
  URLService = environment.URL + '/habilidades';

  constructor(private httpx: HttpClient) { }

  public lista(): Observable<Habilidades[]> {
    return this.httpx.get<Habilidades[]>(this.URLService + '/lista');
  }

  public detail(id: number): Observable<Habilidades> {
    return this.httpx.get<Habilidades>(this.URLService + `/detail/${id}`);
  }

  public save(habilidades: Habilidades): Observable<any> {
    return this.httpx.post<any>(this.URLService + '/create', habilidades);
  }

  public update(id: number, habilidades: Habilidades): Observable<any> {
    return this.httpx.put<any>(this.URLService+ `/update/${id}`, habilidades);
  }

  public delete(id: number): Observable<any> {
    return this.httpx.delete<any>(this.URLService + `/delete/${id}`);
  }
}
