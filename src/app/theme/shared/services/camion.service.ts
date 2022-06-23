import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL'; 
@Injectable({
  providedIn: 'root'
})
export class CamionService {
  url: string;


  constructor(private http:HttpClient) { 
    this.url = GLOBAL.url;
  }
  buscarCamiones(type,token){
  
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}pers/buscar_camion`,{headers:headers});
  }
  obtenerCamiones(type,token){
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}camion/index`,{headers:headers});

  }
  agregarunCamion(type,token,id){
    let params = JSON.stringify(id);
    
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}camion/show`,params,{headers:headers});

  }
  agregarCamiones(type,token,camion){
    let params = JSON.stringify(camion);
    
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}camion/store`,params,{headers:headers});

  }
  modificarCamion(type,token,camion){
    let params = JSON.stringify(camion);
    
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}camion/update`,params,{headers:headers});
  }
  bloquearCamion(type,token,id) {
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}camion/destroy`,params,{headers:headers});
  }

}
