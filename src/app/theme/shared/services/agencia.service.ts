import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Agencia } from '../models/agencia';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {
  url: string;
  agencias: Agencia[];
  agencia: Agencia;
  constructor(
    private http:HttpClient
  ) {
    this.url = GLOBAL.url;
  }
  obtenerAgencias(type,token) {
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}agen/index`,{headers:headers});
  }
  obtenerAgen(type,token,code:any){
    let params=JSON.stringify(code);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}agen/show`,params,{headers:headers});
  }
  actualizarAgen(type,token,agencia:any){
    let params=JSON.stringify(agencia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}agen/update`,params,{headers:headers});
  }
  registrarAgen(type,token,agencia:any){
    let params=JSON.stringify(agencia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}agen/store`,params,{headers:headers});
  }
  obtenerReporte(type,token,guia:any){
    let params=JSON.stringify(guia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/seguimiento_guia`,params,{headers:headers});
  }
  obtenerRemitente(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/remitentes`,params,{headers:headers});
  }
  obtenerConsignatarios(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/consignatarios`,params,{headers:headers});
  }
  obtenerTelefono(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/telefonos`,params,{headers:headers});
  }
  obtenerDe(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/de`,params,{headers:headers});
  }
  obtenerPara(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/para`,params,{headers:headers});
  }
  obtenerCi(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/ci`,params,{headers:headers});
  }
  obtenerNombreCi(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/nombreCI`,params,{headers:headers});
  }
  obtenerTelefonoCi(type,token,n) {
    let params=JSON.stringify(n);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}origs/telefonoCI`,params,{headers:headers});
  }
}
