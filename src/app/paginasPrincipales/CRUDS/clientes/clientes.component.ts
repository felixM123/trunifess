import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { Cliente } from 'src/app/theme/shared/models/cliente';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  cliente: Cliente = {
    id_empr: '001',
    nombre_comercial: '',
    contacto: '',
    id_pais: '',
    id_departamento: '',
    id_localidad: '',
    direccion: '',
    telefonos: '',
    limite_credito: 0,
    nit: 0,
    nombre_factura: '',
    categoria: 'CLIENTE'
  }
  clienteUp: any = {
    id: 0,
    id_empr: '001',
    nombre_comercial: '',
    contacto: '',
    id_pais: '',
    id_departamento: '',
    id_localidad: '',
    direccion: '',
    telefonos: '',
    limite_credito: 0,
    nit: 0,
    nombre_factura: ''
  }
  clienteId = {
    id: 0
  }
  token;
  type;
  id: number;
  titulo: string;
  boton: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private msj: MensajesService,
    private crypto: CryptoService
  ) {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.titulo = 'Editar usuario';
      this.boton = 'Editar'
      this.obtenerCliente(this.id);
    } else {
      this.titulo = 'Nuevo usuario';
      this.boton = 'Registrar'
    }
  }
  obtenerCliente(id: number) {
    this.clienteId.id = id;
    this.clienteService.obtenerCliente(this.type, this.token, this.clienteId).subscribe(res => {
      this.cliente = {
        id_empr: '001',
        nombre_comercial: res['nombre_comercial'],
        contacto: res['contacto'],
        id_pais: res['pais'],
        id_departamento: res['departamento'],
        id_localidad: res['localidad'],
        direccion: res['direccion'],
        telefonos: res['telefonos'],
        limite_credito: res['limite credito'],
        nit: res['nit'],
        nombre_factura: res['nombre_factura'],
        categoria: 'CLIENTE'
      }
      this.clienteUp = {
        id: res['id'],
      }
    })
  }
  onSubmit() {
    if (this.id) {
      this.clienteUp.id_empr = this.cliente.id_empr;
      this.clienteUp.nombre_comercial = this.cliente.nombre_comercial;
      this.clienteUp.contacto = this.cliente.contacto;
      this.clienteUp.id_pais = this.cliente.id_pais;
      this.clienteUp.id_departamento = this.cliente.id_departamento;
      this.clienteUp.id_localidad = this.cliente.id_localidad;
      this.clienteUp.direccion = this.cliente.direccion;
      this.clienteUp.telefonos = this.cliente.telefonos;
      this.clienteUp.limite_credito = this.cliente.limite_credito;
      this.clienteUp.nit = this.cliente.nit;
      this.clienteUp.nombre_factura = this.cliente.nombre_factura;
      this.clienteService.actualizarCliente(this.type, this.token, this.clienteUp).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al modificar los datos');
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al modificar los datos');
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se modificaron correctamente los datos');
          this.router.navigate(['lista/clientes']);
        }
      }, error => {
        this.msj.mensajeError('Error', 'Error al modificar los datos vuelva a intentarlo......');
      })
    } else {
      this.cliente.nombre_comercial=this.cliente.nombre_comercial.toUpperCase();
      this.cliente.contacto=this.cliente.contacto.toUpperCase();
      this.cliente.id_pais=this.cliente.id_pais.toUpperCase();
      this.cliente.id_departamento=this.cliente.id_departamento.toUpperCase();
      this.cliente.id_localidad=this.cliente.id_localidad.toUpperCase();
      this.cliente.direccion=this.cliente.direccion.toUpperCase();
      this.cliente.nombre_factura=this.cliente.nombre_factura.toUpperCase();
      this.clienteService.agregarCliente(this.type, this.token, this.cliente).subscribe(res => {
        if (Object.keys(res).length === 0 == true) {
          this.msj.mensajeError('Error', 'Error al registrar los datos');
        } else if (res['errors']) {
          this.msj.mensajeError('Error', 'Error al registrar los datos');
        }
        else {
          this.msj.mensajeCorrecto('Correcto', 'Se registro correctamente los datos')
          this.router.navigate(['lista/clientes']);
        }
      }, error => {
        this.msj.mensajeError('Error', 'Error al registrar los datos vuelva a intentarlo......');
      })
    }
  }
  volver() {
    this.router.navigate(['lista/clientes']);
  }

}
