import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoferService } from 'src/app/theme/shared/services/chofer.service';
import { ChoferUp, Chofer } from 'src/app/theme/shared/models/chofer';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';


@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {
  chofer: Chofer = {
    id_empr: '',
    nombre_comercial: '',
    contacto: '',
    id_pais: '',
    id_departamento: '',
    id_localidad: '',
    direccion: '',
    telefonos: '',
    categoria: ''

  }
  choferId = {
    id: 0
  }
  choferUp: ChoferUp = {
    id: 0,
    id_empr: '',

    contacto: '',
    id_pais: '',
    id_departamento: '',
    id_localidad: '',
    direccion: '',
    telefonos: '',
    categoria: ''
  }
  titulo: string;
  boton:string;
  id: number;
  type: any;
  token: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private choferService: ChoferService,
    private msj: MensajesService,
    private crypto: CryptoService
  ) {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.chofer.id_empr= '001';
    this.chofer.categoria='CHOFER'
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.titulo = 'Editar chofer';
      this.boton='Editar'
      this.obtenerChofer();

    } else {
      this.titulo = 'Nuevo chofer';
      this.boton='Registrar'
    }
  }
  obtenerChofer() {
    this.choferId.id = this.id;
    this.choferService.obtenerunChofer(this.type, this.token, this.choferId).subscribe(res => {
      this.chofer.contacto = res['contacto'];
      this.chofer.id_pais = res['pais'];
      this.chofer.id_departamento = res['departamento'];
      this.chofer.id_localidad = res['localidad'];
      this.chofer.direccion = res['direccion'];
      this.chofer.telefonos = res['telefonos'];
    })
  }
  onSubmit() {
    if (this.id) {
      this.choferUp.id = this.id;
      this.choferUp.id_empr = this.chofer.id_empr;
      this.choferUp.contacto = this.chofer.contacto;
      this.choferUp.id_pais = this.chofer.id_pais;
      this.choferUp.id_departamento = this.chofer.id_departamento;
      this.choferUp.id_localidad = this.chofer.id_localidad;
      this.choferUp.direccion = this.chofer.direccion;
      this.choferUp.telefonos = this.chofer.telefonos;
      this.choferUp.categoria = this.chofer.categoria;
      this.choferService.actualizarChofer(this.type, this.token, this.choferUp).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al modificar datos')
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al modificar datos')
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se modifico correctamente los datos')
          this.router.navigate(['lista/choferes']);
        }
      },error=>{
        this.msj.mensajeError('Error','Error al modificar los datos vuelva a intentarlo......')
      })
    }
    else {
      this.choferService.agregarChoferes(this.type, this.token, this.chofer).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al registrar datos')
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al registrar los datos')
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se registro correctamente los datos')
          this.router.navigate(['lista/choferes']);
        }
      },error=>{
        this.msj.mensajeError('Error','Error al registrar los datos vuelva a intentarlo......');
      })
    }
  }
  volver() {
    this.router.navigate(['lista/choferes']);
  }

}
