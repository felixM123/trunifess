import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal,NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencia } from "src/app/theme/shared/models/agencia";
import { Recepcion } from "src/app/theme/shared/models/recepcion";
import { Observable, Subject, merge } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';

import * as wjcCore from "wijmo/wijmo";
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss'],
  providers: [DecimalPipe]
})
export class RecepcionComponent implements OnInit {

  focus = new Subject<string>();
  click = new Subject<string>();
  focus1 = new Subject<string>();
  click1 = new Subject<string>();
  focus2 = new Subject<string>();
  click2 = new Subject<string>();
  recepcion: Recepcion = {
    client_id: 0,
    nit_factura: "",
    nombre_factura: "",
    agencia_id: 0,
    forma_pago: 'PAGADO',
    remitente: "",
    consignatario: "",
    cantidad: 0,
    peso: "",
    precio_unitario: 0,
    total: 0,
    contenido: "",
    observacion: "",
    efectivo: 0,
    cambio: 0,
    agen_id: 0,
    usuario_id: 0,
    telefono_consignatario: ''
  }
  objeto = {
    id: 0,
    nombre_comercial: "",
    contacto: "",
    nit: "",
    nombre_factura: ""
  }
  kind = ['PAGADO', 'POR PAGAR EN DESTINO'];

  agencias: Agencia[];
  clientesBus: any[];
  selectCliente: any[];
  rows = [];
  temp = [];
  clientes: any[];
  id: number;
  type: any;
  token: any;
  form1: FormGroup;
  cliente: any;

  precio_unitario: any;
  fragil: boolean;
  valorN: boolean;
  sinDinero: boolean;
  total: any;

  remitentes: any = [];
  consignatarios: any = [];
  telefonos: any = [];

  cargando: boolean = true;
  modal: boolean = false;
  idR: any;
  dato: any;
  reimprimir = {
    id: ''
  }
  constructor(private modalService: NgbModal,
    private agenciaService: AgenciaService,
    private recepcionService: RecepcionService,
    private clieteService: ClienteService,
    public fb: FormBuilder,
    private router: Router, private pipe: DecimalPipe,
    private msj: MensajesService,private crypto: CryptoService) {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));

    this.cliente = this.crypto.decodeData(localStorage.getItem("identity"));
    this.recepcion.agencia_id = 0;
    this.form1 = fb.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      firstname1: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      telefono: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])]

    });
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.remitentes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  search1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.consignatarios.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  search2 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.telefonos.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  ngOnInit() {
    this.obtenerClientes();
    this.obtenerAgencias();
    this.obtenerRemitente();
    this.obtenerConsignatario();
    this.obtenerTelefono();
    this.id = this.crypto.decodeData(localStorage.getItem("id"));
  }
  obtenerRemitente() {
    this.agenciaService.obtenerRemitente(this.type, this.token, '').subscribe(res => {


      for (const data in res) {
        this.remitentes.push(
          res[data]['nombre']
        );
      }

    });
  }
  obtenerConsignatario() {
    this.agenciaService.obtenerConsignatarios(this.type, this.token, '').subscribe(res => {
      for (const data in res) {
        this.consignatarios.push(
          res[data]['nombre']
        );
      }
    });
  }
  obtenerTelefono() {
    this.agenciaService.obtenerTelefono(this.type, this.token, '').subscribe(res => {
      for (const data in res) {
        this.telefonos.push(
          res[data]['nombre']
        );
      }
    });
  }
  buscarClin(event) {

    this.rows = this.temp.filter(dato => {
      const term = event.target.value.toLowerCase();
      return dato.contacto.toLowerCase().includes(term)
        || this.pipe.transform(dato.id).includes(term)
        || this.pipe.transform(dato.nit).includes(term)
        || dato.nombre_comercial.toLowerCase().includes(term)
        || dato.nombre_factura.toLowerCase().includes(term);
    });
  }

  selectData(item) {
    this.objeto.id = item.id;
    this.objeto.nit = item.nit;
    this.objeto.contacto = item.nombre_comercial;
    this.objeto.nombre_factura = item.nombre_factura;
  }

  busquedaClientes() {
    this.clieteService.obtenerClientes(this.type, this.token).subscribe(res => {
      this.clientesBus = [];
      for (const item in res) {
        this.clientesBus.push(res[item]);
      }
      this.temp = this.clientesBus;
      this.rows = this.clientesBus;
          })
  }

  obtenerClientes() {
    this.clieteService.obtenerClientes(this.type, this.token).subscribe(res => {
      this.clientes = [];
      for (const item in res) {
        if (res[item].id == 1) {
          this.clientes.push(res[item]);
          this.objeto.id = res[item].id;
          this.objeto.nit = res[item].nit;
          this.objeto.contacto = res[item].nombre_comercial;
          this.objeto.nombre_factura = res[item].nombre_factura;
        }
      }

    })
    this.fragil = true;
    this.valorN = true;
    this.sinDinero = true;
    this.recepcion.observacion += (this.fragil) ? 'FRAGIL /' : '';
    this.recepcion.observacion += (this.valorN) ? 'VALOR NO DECLARADO /' : '';
    this.recepcion.observacion += (this.sinDinero) ? 'SIN DINERO / NI OBJETOS DE VALOR /' : '';
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias.push(res[item]);
        }
      }
    });
  }
  operacion() {
    if (this.total >= 0 && this.recepcion.cantidad >= 0) {
      this.precio_unitario = Math.round((this.total / this.recepcion.cantidad) * 100 / 100);
    }
  }
  operacion1() {
    if (this.recepcion.cantidad >= 0 && this.precio_unitario >= 0) {
      this.total = this.recepcion.cantidad * this.precio_unitario;
    }
  }
  operacion2() {
    this.recepcion.cambio = this.recepcion.efectivo - this.total;
  }
  observaciones() {
    this.recepcion.observacion = "";
    this.recepcion.observacion += (this.fragil) ? 'FRAGIL /' : '';
    this.recepcion.observacion += (this.valorN) ? 'VALOR NO DECLARADO /' : '';
    this.recepcion.observacion += (this.sinDinero) ? 'SIN DINERO / NI OBJETOS DE VALOR /' : '';
    return this.recepcion.observacion;
  }
  restaurarform() {
    this.recepcion.remitente='';
    this.recepcion.consignatario='';
    this.recepcion.telefono_consignatario='';
    this.recepcion.cantidad=0;
    this.recepcion.peso='';
    this.recepcion.precio_unitario=0;
    this.recepcion.total=0;
    this.recepcion.efectivo=0;
    this.recepcion.cambio=0;
    this.recepcion.contenido='';
    this.recepcion.observacion='';
    this.recepcion.agencia_id = 0;
    this.recepcion.forma_pago='PAGADO';
    this.precio_unitario = '';
    this.total = '';
    this.obtenerClientes();
  }
  registroImprecion(content) {
    this.recepcionService.registrarRecepcion(this.recepcion, this.type, this.token).subscribe(res => {

      if (res['message'] == 'success!') {
        this.idR = res['id'];
        this.reimprimir.id = this.idR;
        this.msj.mensajeCorrecto('Correcto', 'Registro Correcto');
        this.recepcionService.reporteReimprecion(this.reimprimir, this.type, this.token).subscribe(res => {
          this.dato = {
            origen: res[0]['origen'],
            destino: res[0]['destino'],
            fecha: res[0]['fecha'],
            cambio: res[0]['cambio'],
            consignatario: res[0]['consignatario'],
            remitente: res[0]['remitente'],
            observacion: res[0]['observacion'],
            contenido: res[0]['descripcion'],
            guia: res[0]['guia'],
            peso: parseInt(res[0]['peso']),
            precio_unitario: (res[0]['monto'] / res[0]['piezas']).toFixed(2),
            total: res[0]['monto'],
            cantidad: parseInt(res[0]['piezas']),
            hora: res[0]['hora'],
            telefono_consignatario: res[0]['telefono'],
            efectivo: res[0]['pagado'],
            usuario: res[0]['usuario'],
            xpd: res[0]['tipo']
          }
          this.cargando = true;
          this.restaurarform();
          setTimeout(() => {
            this.printDocument();

          }, 1000);
            this.open(content);
        }, error => {
          this.msj.mensajeError('Error', 'Se produjo un error recargue la pagina....')
          this.cargando = true;
          this.restaurarform();

        });

      } else {
        this.msj.mensajeError('Error', 'Se produjo un error intente nuevamente')
        this.cargando = true;
        this.restaurarform();
      }
    }, error => {
      this.msj.mensajeError('Error', 'Se produjo un error recargue la pagina....')
      this.cargando = true;
    }
    )
  }
  registrar(content) {
    this.cargando = false;
    if (this.recepcion.agencia_id == 0) {
      this.msj.mensajeError('Error', 'Seleccione Agencia de Destino')
      this.cargando = true;
    } else {
      this.recepcion.remitente = this.recepcion.remitente.toUpperCase();
      this.recepcion.consignatario = this.recepcion.consignatario.toUpperCase();
      this.recepcion.contenido = this.recepcion.contenido.toUpperCase();
      this.recepcion.client_id = this.objeto.id;
      this.recepcion.nit_factura = this.objeto.nit;
      this.recepcion.nombre_factura = this.objeto.nombre_factura
      this.recepcion.total = this.total;
      this.recepcion.precio_unitario = this.precio_unitario;
      this.recepcion.agen_id = this.id;
      this.recepcion.usuario_id = this.cliente.id;
      this.recepcion.total = this.total;
      if (this.recepcion.forma_pago === "PAGADO") {
        if (this.recepcion.efectivo > 0 && this.recepcion.efectivo >= this.total) {
          this.registroImprecion(content);
        } else {
          this.msj.mensajeAdvertencia('Alerta', 'Ingrese un monto mayor o igual al total');
          this.cargando = true;
        }
      } else {
        this.registroImprecion(content);

      }
    }
  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice-1"));
    doc.print();
  }
  open(content){

    const modalRef = this.modalService.open(content, {
      size: "lg", centered: true, backdrop: "static", windowClass: "dark-modal"
    });
    // modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "Ok") {


      };
    }, (reason) => {

    });
  }
}
