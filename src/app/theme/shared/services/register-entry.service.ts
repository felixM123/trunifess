import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { GLOBAL } from '../GLOBAL'; 
@Injectable({
  providedIn: 'root'
})
export class RegisterEntryService{
    url:string;
    constructor(
        private http:HttpClient
    ) {
        this.url=GLOBAL.url;
    }
    registroIngreso(type,token,ingreso:any){
        let params = JSON.stringify(ingreso);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}entrs/registro_efectivo`,params,{headers:headers});
    }
    listaIngresos(type,token,datos:any){
        let params = JSON.stringify(datos);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}entrs/lista_efectivo`,params,{headers:headers});
    }
    registroEgreso(type,token,egreso:any){
        let params = JSON.stringify(egreso);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}entrs/registro_efectivo`,params,{headers:headers});
    }
    listaEgresos(type,token,datos:any){
        let params = JSON.stringify(datos);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}entrs/lista_efectivo`,params,{headers:headers});
    }
    reporteReimprecionIngreso(id,type,token){
        let params = JSON.stringify(id);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}reporte/reimpresion_efectivo`,params,{headers:headers});
      }
      reporteDetalleIngreso(id,type,token){
    
        let params = JSON.stringify(id);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
        return this.http.post(`${this.url}detrs/reimpresion_detalle_efectivo`,params,{headers:headers});
      }
}