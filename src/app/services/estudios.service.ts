import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudios } from '../models/estudios';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {
  URLService = environment.URL + '/estudios';

  constructor(private httpx: HttpClient) { }

  public lista(): Observable<Estudios[]> {
    return this.httpx.get<Estudios[]>(this.URLService + '/lista');
  }

  public detail(id: number): Observable<Estudios> {
    return this.httpx.get<Estudios>(this.URLService + `/detail/${id}`);
  }

  public save(estudios: Estudios): Observable<any> {
    return this.httpx.post<any>(this.URLService + '/create', estudios);
  }

  public update(id: number, estudios: Estudios): Observable<any> {
    return this.httpx.put<any>(this.URLService + `/update/${id}`, estudios);
  }

  public delete(id: number): Observable<any> {
    return this.httpx.delete<any>(this.URLService + `/delete/${id}`);
  }
}
