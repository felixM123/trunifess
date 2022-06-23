import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Recepcion } from '../models/recepcion';
import { GLOBAL } from '../GLOBAL';
@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  url: string;
  url3: string;
  resepciones: Recepcion[];
  recepcion: Recepcion;

  constructor(private http:HttpClient) {
    this.url = GLOBAL.url;

  }

  registrarRecepcion(recepcion:any,type,token){
    let params = JSON.stringify(recepcion);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}entrs/recepcion`,params,{headers:headers});
  }

  buscarRecepcion(recepcion,type,token){
    let params = JSON.stringify(recepcion);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}entrs/buscador_recepciones`,params,{headers:headers});
  }
  reporteRecepcion(reporte,type,token){
    let params = JSON.stringify(reporte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/recepcion`,params,{headers:headers});
  }
  reporteRecepcionTodo(reporte,type,token){
    let params = JSON.stringify(reporte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/recepcion_todas`,params,{headers:headers});
  }
  reporteTransaccion(reporte,type,token){
    let params = JSON.stringify(reporte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/transaccion`,params,{headers:headers});
  }
  reporteTransaccionCen(reporte,type,token){
    let params = JSON.stringify(reporte);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url3}reporte/lista_transacciones`,params,{headers:headers});
  }
  reporteReimprecion(id,type,token){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/reimpresion_recepcion`,params,{headers:headers});
  }
  reporteVerificacionAnulacion(guia,type,token){
    let params = JSON.stringify(guia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/verifcacion_anulacion`,params,{headers:headers});
  }
  reporteReimprecionEntrega(id,type,token){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/reimpresion_entrega`,params,{headers:headers});
  }
  reporteReimprecionEmbarque(id,type,token){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/reimpresion_embarque`,params,{headers:headers});
  }
  reporteDetalleEmbarque(id,type,token){

    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}detrs/detalle_embarques`,params,{headers:headers});
  }
  reporteReimprecionDesembarque(id,type,token){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/reimpresion_desembarco`,params,{headers:headers});
  }
  reporteDetalleDesembarque(id,type,token){

    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}detrs/detalle_desembarco`,params,{headers:headers});
  }
  reporteAnulacion(guia,type,token){
    let params = JSON.stringify(guia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}entrs/anular_recepcion`,params,{headers:headers});
  }
  reporteVerificacionAnulacionEntrega(guia,type,token){
    let params = JSON.stringify(guia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}reporte/verifica_anulacion_entrega`,params,{headers:headers});
  }
  reporteAnulacionEntrega(guia,type,token){
    let params = JSON.stringify(guia);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}entrs/anular_entrega`,params,{headers:headers});
  }
  reporteResumen(fecha,type,token){
    let params = JSON.stringify(fecha);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}saldoefec/obtener_reporte`,params,{headers:headers});
  }
  reporteResumenDetalle(fecha,type,token){
    let params = JSON.stringify(fecha);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}saldoefec/consulta_dia`,params,{headers:headers});
  }

}
