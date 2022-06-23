import { Component, OnInit } from '@angular/core';
import { Agencias } from 'src/app/theme/shared/models/agencia';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit {
  agencia:Agencias={
    cod:'',
    nombre:'',
    direccion:'',
    telefonos:'',
    acronimo:'',
    guia:0,
    numero_ceros:0,
    alcaldia:''
  }
  cod={
    cod:''
  }
  titulo: string;
  boton: string;
  type:any;
  token:any;
  id:any;
  constructor(private route: ActivatedRoute,
                private router:Router,
                private agenciaService:AgenciaService,
                private msj:MensajesService,
                private crypto: CryptoService
                )
 {
  this.type = this.crypto.decodeData(localStorage.getItem("type"));
  this.token = this.crypto.decodeData(localStorage.getItem("token"));
  this.agencia.guia=1;
  this.agencia.numero_ceros=4;
 }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.titulo = 'Editar agencia';
      this.boton='Editar';
      this.obtenerAgencia();

    } else {
      this.titulo = 'Nueva agencia';
      this.boton='Registrar';
    }
  }
  obtenerAgencia(){
    this.cod.cod=this.id
    this.agenciaService.obtenerAgen(this.type,this.token,this.cod).subscribe(res=>{
      this.agencia.nombre=res['nombre']
      this.agencia.direccion=res['direccion']
      this.agencia.telefonos=res['telefonos']
      this.agencia.alcaldia=res['alcaldia']
      this.agencia.cod=res['codigo']
      this.agencia.acronimo=res['acronimo']
    })
  }
  volver(){
    this.router.navigate(['lista/agencias']);
  }
  onSubmit(){
    if (this.id) {
      this.agenciaService.actualizarAgen(this.type,this.token,this.agencia).subscribe(res=>{
        if (res['cod']){
          this.msj.mensajeCorrecto('Correcto','Se actualizo correctamente el codigo'+res['cod']);
          this.router.navigate(['lista/agencias']);
        } else {
          this.msj.mensajeError('Error','Ocurrio un error en la actualizacion');
        }
      },error=>{
        this.msj.mensajeError('Error','Ocurrio un error vuelva a intentarlo......!');
      })
    } else {
      this.agenciaService.registrarAgen(this.type,this.token,this.agencia).subscribe(res=>{
        if (res['cod']) {
          this.msj.mensajeCorrecto('Correcto','Se registro correctamente el codigo'+res['cod']);
          this.router.navigate(['lista/agencias']);
        } else {
          this.msj.mensajeError('Error','Ocurrio un error en el registro');
        }
      },error=>{
        this.msj.mensajeError('Error','Ocurrio un error vuelva a intentarlo......!');
      })
    }

  }
}
