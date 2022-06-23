import { Component, OnInit } from '@angular/core';
import { Camiones, CamionUp } from 'src/app/theme/shared/models/camion';
import { ActivatedRoute, Router } from '@angular/router';
import { CamionService } from 'src/app/theme/shared/services/camion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.scss']
})
export class CamionesComponent implements OnInit {
  camion:Camiones={
    id_empr: '',
    nombre_comercial: '',
    contacto: '',
    categoria:''
  }
  camionId={
    id:0,
  }
  camionUp:CamionUp={
    id:0,
    id_empresa:'',
    nombre_comercial:'',
    contacto:''
  }
  titulo: string;
  boton: string;
  type:any;
  token:any;
  id:number;
  camiones:any;
  modelo:string;
  placa:string;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private camionService:CamionService,
              private msj:MensajesService,
              private crypto: CryptoService
  )
  {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.camion.id_empr= '001';
    this.camion.categoria='CAMION';

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.titulo = 'Editar camiones';
      this.boton='Editar';
      this.obtenerCamion();

    } else {
      this.titulo = 'Nuevo camiones';
      this.boton='Registrar';
    }

  }
  obtenerCamion() {
    this.camionId.id=this.id;
    this.camionService.agregarunCamion(this.type,this.token,this.camionId).subscribe(res=>{
    this.camion.nombre_comercial=res['modelo'];
    this.camion.contacto=res['placa'];
    })
  }
  onSubmit(){
    if (this.id) {
      this.camionUp.id=this.id;
      this.camionUp.id_empresa=this.camion.id_empr;
      this.camionUp.nombre_comercial=this.camion.nombre_comercial;
      this.camionUp.contacto=this.camion.contacto;
      this.camionService.modificarCamion(this.type, this.token, this.camionUp).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al modificar datos')
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al modificar datos')
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se modifico correctamente los datos')
          this.router.navigate(['lista/camiones']);
        }
      },error=>{
        this.msj.mensajeError('Error','Error al modificar los datos vuelva a intentarlo......')
      })
    }else{
      this.camionService.agregarCamiones(this.type, this.token, this.camion).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al registrar datos')
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al registrar los datos')
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se registro correctamente los datos')
          this.router.navigate(['lista/camiones']);
        }
      },error=>{
        this.msj.mensajeError('Error','Error al registrar los datos vuelva a intentarlo......');
      })
    }
  }
  volver() {
    this.router.navigate(['lista/camiones']);
  }
}
