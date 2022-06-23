import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL'; 
@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  url: string;


  constructor(private http:HttpClient) { 
    this.url = GLOBAL.url;
  }
  buscarChofer(type,token){
  
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}pers/buscar_chofer`,{headers:headers});
  }
  obtenerChofere(type,token){
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}chofer/index`,{headers:headers});

  }
  agregarChoferes(type,token,choferes){
    let params = JSON.stringify(choferes);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}chofer/store`,params,{headers:headers});

  }
  actualizarChofer(type,token,usuario) {
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}chofer/update`,params,{headers:headers});
  }
  obtenerunChofer(type,token,id){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}chofer/show`,params,{headers:headers});
  }
  bloquearChofer(type,token,id) {
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}chofer/destroy`,params,{headers:headers});
  }
 
}
