import { Injectable } from '@angular/core';
import { GLOBAL } from '../GLOBAL';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchBoarding } from '../models/search_boarding';

@Injectable({
  providedIn: 'root'
})
export class DisembarkationService {
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }
  obtenerEmbarcos(type: string, token: string, data: SearchBoarding) {
    let params = new HttpParams().set('agencia_id', data.agencia_id.toString()).set('fecha_del', data.fecha_del.toString()).set('fecha_al', data.fecha_al.toString()).set('agen_id', data.agen_id.toString());
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.get(`${this.url}entrs/buscador_embarques`, { headers: headers, params: params });
  }
  listaEmbarques(type: string, token: string, id) {
    let params =JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.post(`${this.url}detrs/detalle_embarques`,params, { headers: headers});
  }
  realizarDesembarco(type: string, token: string, embarco: any) {
    let params = JSON.stringify(embarco);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.post(`${this.url}entrs/desembarco`, params, { headers: headers });
  }
}
