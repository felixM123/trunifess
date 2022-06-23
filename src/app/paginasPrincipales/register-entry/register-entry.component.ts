import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbCalendar, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Literal } from "src/app/theme/shared/models/literal";
import { RegisterEntryService } from "src/app/theme/shared/services/register-entry.service";
import * as wjcCore from "wijmo/wijmo";
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { egreso, ingreso } from 'src/app/theme/shared/models/egresosIn'
import { Router } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: "app-register-entry",
  templateUrl: "./register-entry.component.html",
  styleUrls: ["./register-entry.component.scss"],
  providers: [Literal]
})
export class RegisterEntryComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  focus = new Subject<string>();
  click = new Subject<string>();
  focus1 = new Subject<string>();
  click1 = new Subject<string>();
  encabezado: string;
  titulo: string;
  literal;
  fecha;
  tipoT: string;
  fechaT: string;
  registro: any = {
    fecha: "",
    de: "",
    usuario_id: 0,
    para: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    monto: 0,
    detalle: "",
    detalles: []
  };

  reporte: any = {

    tipo: '',
    titulo: "",
    de: "",
    para: "",
    fecha: "",
    detalle: "",
    monto: "",
    literal: "",
    detalles: [],
    origen: ''
  };

  objeto = {
    peaje: 0,
    coca: 0,
    viaticos: 0,
    combustible: 0,
    otros: 0,
    total: 0
  };
  detalle: any[] = [];
  bandera = 'arreglo';
  values: any[] = [];
  ingreso: any[] = [];
  ingreso1:any=[];
  usuario;
  token;
  detalleEncavezado: any;
  type;
  idIN: any;
  kind = [
    "OFICINA",
    "3088-GEU",
    "3088-GFA",
    "3599-HYS",
    "3606-XSI",
    "4003-SPY",
    "4003-SRC",
    "4120-YXY",
    "4087-UXC",
    "4434-BGS",
    "4434-BHX",
    "4732-YPG",
    "4732-YRK",
    "ELOY ORTEGA MENDEZ",
    "ALBERTO MALDONADO MENESES",
    "TRANSOFT CANCELADOS",
    "TRANSOFT POR PAGAR ENVIADOS",
    "TRANSOFT POR PAGAR ENTREGADOS",
    "CORPORATIVO",
    "TRASPASO A BANCO",
    "INGRESO GUÍAS MANUALES ENTREGADOS"

  ];
  total = 0.00;
  mensaje: any;
  agencias: any[];
  id: any;
  agenPropio: any;
  data1: any;
  cargando: boolean = true;
  de: any = [];
  para: any = [];

  constructor(
    private modal: NgbModal,
    private calendar: NgbCalendar,
    private lit: Literal,
    private registroService: RegisterEntryService,
    private modalService: NgbModal,
    private agenciaService: AgenciaService,
    private msj:MensajesService,
    private router:Router,
    private crypto: CryptoService
  ) {

    this.registro.agen_id = this.crypto.decodeData(localStorage.getItem("id"));
    this.fecha = this.calendar.getToday();
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.registro.tipo = "OFICINA";
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.obtenerAgencias();

  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.para.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  search1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.de.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  ngOnInit() {

    this.usuario = this.crypto.decodeData(localStorage.getItem("identity"));
    if (this.encabezado === "ingreso") {

      this.ingreso = ingreso;

      this.llenarArregloIngreso();
      this.obtenerDe();
      this.titulo = "REGISTRO DE INGRESO DE EFECTIVO";
      this.registro.tipo_transaccion = "INGRESO EFECTIVO";
      this.tipoT = "TIPO DE INGRESO";
      this.fechaT = "INGRESO";
      this.reporte.titulo = "RECEPCION DE EFECTIVO";
      this.reporte.para = this.usuario.nombre.toUpperCase();
      this.registro.para = this.usuario.nombre.toUpperCase();
      this.obtenerAgencias();

    } else {
      this.values = egreso;
      this.llenarArreglo();
      this.obtenerPara();
      this.titulo = "REGISTRO DE SALIDA DE EFECTIVO";
      this.registro.tipo_transaccion = "SALIDA DE EFECTIVO";
      this.tipoT = "TIPO DE EGRESO";
      this.fechaT = "SALIDA";
      this.reporte.titulo = "ENTREGA DE EFECTIVO";
      this.reporte.de = this.usuario.nombre.toUpperCase();
      this.registro.de = this.usuario.nombre.toUpperCase();
      this.obtenerAgencias();

    }
  }
  obtenerPara() {
    this.agenciaService.obtenerPara(this.type, this.token, '').subscribe(res => {
      for (const data in res) {
        this.para.push(
          res[data]['nombre']
        );
      }
    });
  }
  obtenerDe() {
    this.agenciaService.obtenerDe(this.type, this.token, '').subscribe(res => {
      for (const data in res) {
        this.de.push(
          res[data]['nombre']
        );
      }
    });
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id == res[item].id) {
          this.agenPropio = res[item]['nombre'];
          this.reporte.origen = this.agenPropio;
        } else {
        }
      }
    });
  }

  datosTotal(event) {
    this.total = 0;
    if (this.detalle[event.indice].nombre === this.values[event.indice]) {
      this.detalle[event.indice].valor = parseFloat(event.numero);
    }
    for (let i = 0; i < this.detalle.length; i++) {
      this.total += this.detalle[i].valor;
      this.registro.monto = this.total.toFixed(2);
    }
    this.numeroLetras();
  }
  datosIngreso(event) {
    this.total = 0;
    if (this.detalle[event.indice].nombre === this.ingreso[event.indice]) {
      this.detalle[event.indice].valor = parseFloat(event.numero);
    }
    for (let i = 0; i < this.detalle.length; i++) {
      this.total += this.detalle[i].valor;
      this.registro.monto = this.total.toFixed(2);
    }
    this.numeroLetras();
  }
  llenarArreglo() {
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i] != 'total') {
        this.detalle.push({
          nombre: this.values[i],
          valor: 0
        });
      }
    }
  }
  llenarArregloIngreso() {
    for (let i = 0; i < this.ingreso.length; i++) {
      if (this.ingreso[i] != 'total') {
        this.detalle.push({
          nombre: this.ingreso[i],
          valor: 0
        });
      }
    }
  }
  enviarDatos() {
    for (let i = 0; i < this.detalle.length; i++) {
      if (this.detalle[i].valor > 0) {
        this.registro.detalles.push(this.detalle[i]);
        this.reporte.detalles.push(this.detalle[i])
      }
    }
  }
  registrar( form) {
      this.cargando = false;
      if (this.encabezado === "ingreso") {
        this.registro.de = form.value.de.toUpperCase();
        this.reporte.de = form.value.de.toUpperCase();
        this.enviarDatos();
      } else {
        this.registro.para = form.value.para.toUpperCase();
        this.reporte.para = form.value.para.toUpperCase();
        this.enviarDatos();
      }
      this.registro.tipo = form.value.tipo.toUpperCase();
      this.registro.detalle = form.value.detalle.toUpperCase();
      this.registro.fecha = `${this.fecha.year}-${this.fecha.month}-${this.fecha.day}`;
      this.registro.usuario_id = this.usuario.id;
      this.reporte.tipo = this.registro.tipo;
      this.reporte.fecha = `${this.fecha.year}-${this.fecha.month}-${this.fecha.day}`;
      this.reporte.literal = this.literal;
      this.reporte.monto = this.registro.monto;
      this.reporte.detalle = form.value.detalle.toUpperCase();
      this.registroService.registroIngreso(this.type, this.token, this.registro)
        .subscribe(res => {
          if (Object.keys(res).length === 0 == true) {
            this.msj.mensajeError('Error','Error en el registro vuelva a intentarlo.......');
            this.modal.dismissAll();
          } else {
            this.idIN = res['id'];

              if (this.tipoT == 'TIPO DE INGRESO') {
                // ingreso
                this.router.navigate([`vista-ie/${this.idIN}`]);
              // fin de ingreso
              } else {
                // egreso
                this.router.navigate([`vista-ie1/${this.idIN}`]);
              }
              this.msj.mensajeCorrecto('Correcto','Registro exitoso');
              this.modal.dismissAll();
          }
        });

  }
  salir() {
    this.modal.dismissAll();
  }
  numeroLetras() {
    this.literal = this.lit.numeroALetras(this.total, {
      plural: "Bolivianos",
      singular: "Bolivianos",
      centPlural: "Bolivianos",
      centSingular: "Bolivianos"
    });
  }
  open(content) {
    const modalRef = this.modalService.open(content, {
      size: "xl" as "lg", centered: true, backdrop: "static", windowClass: "dark-modal"
    });
    modalRef.result.then((result) => {
      // console.log(result);
    }, (reason) => {
      if (reason == 'Success') {
        window.location.reload();
        // form.reset();
      };
    });
  }
}
