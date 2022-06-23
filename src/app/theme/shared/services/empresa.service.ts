import { Injectable } from '@angular/core';
import { GLOBAL } from '../GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }
  obtenerStadistica(type, token, data: any) {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`);
    return this.http.post(`${this.url}reporte/resumen`, params, { headers: headers });
  }
}
