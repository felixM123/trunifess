import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeError(titulo:string,mensaje:string){
      Swal({
        title:titulo,
        text:mensaje,
        type:'error'
      })
  }
  mensajeCorrecto(titulo:string,mensaje:string){
    Swal({
      title:titulo,
      text:mensaje,
      type:'success'
    })
}
mensajeAdvertencia(titulo:string,mensaje:string){
  Swal({
    title:titulo,
    text:mensaje,
    type:'warning'
  })
}
}
