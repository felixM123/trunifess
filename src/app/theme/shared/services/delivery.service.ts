import { Injectable } from '@angular/core';
import { GLOBAL } from "../GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchGuide } from '../models/search_guides';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }
  obtenerGuias(type: string, token: string, data: SearchGuide) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.get(`${this.url}entrs/buscador_guia?agen_id_origen=${data.agen_id_origen}&fecha_del=${data.fecha_del}&fecha_al=${data.fecha_al}&estado=${data.estado}&agen_id=${data.agen_id}&criterio=${data.criterio}`, { headers: headers });
  }
  detalleGuia(type: string, token: string, guia: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.get(`${this.url}entrs/guia?numero_guia=${guia}`, { headers: headers });
  }
  realizarDesembarco(type: string, token: string, embarco: any) {
    let params = JSON.stringify(embarco);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.post(`${this.url}entrs/desembarco`, params, { headers: headers });
  }
  entregaEmbarco(type: any, token: any, embarco: any) {
    let params = JSON.stringify(embarco);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`)
    return this.http.post(`${this.url}entrs/entrega`, params, { headers: headers });
  }
}
