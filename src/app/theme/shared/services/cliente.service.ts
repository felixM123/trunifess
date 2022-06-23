import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url: string;
  clientes: Cliente[];
  cliente: Cliente;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }
  obtenerClientes(type, token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`);
    return this.http.get(`${this.url}pers/buscar`, { headers: headers });
  }
  obtenerClientesLista(type, token) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `${type} ${token}`);
    return this.http.get(`${this.url}cliente/index`, { headers: headers });
  }
  agregarCliente(type,token,cliente) {
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}cliente/store`,params,{headers:headers});
  }
  actualizarCliente(type,token,cliente) {
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}cliente/update`,params,{headers:headers});
  }
  obtenerCliente(type,token,id){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}cliente/show`,params,{headers:headers});
  }
 
  bloquearCliente(type,token,id) {
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}cliente/destroy`,params,{headers:headers});
  }
}
