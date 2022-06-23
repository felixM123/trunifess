import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal,NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryService } from 'src/app/theme/shared/services/delivery.service';
import { Router } from '@angular/router';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Observable, Subject, merge} from 'rxjs';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import * as wjcCore from "wijmo/wijmo";
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;
  focus = new Subject<string>();
    click = new Subject<string>();
    focus1 = new Subject<string>();
    click1 = new Subject<string>();
    focus2 = new Subject<string>();
    click2 = new Subject<string>();
  embarco: any = {
    guia: '',
    origen: '',
    destino: '',
    tipo: 'PAGADO',
    remitente: '',
    consignatario: '',
    cantidad: 0,
    peso: 0,
    precio_unitario: 0,
    total: 0,
    contenido: '',
    observacion: '',
    nombres: '',
    ci: '',
    telefono: '',
    efectivo: 0,
    cambio: 0,
    fecha: '',
    hora: ''
  };
  embarcoR: any = {
    guia: '',
    origen: '',
    destino: '',
    tipo: 'PAGADO',
    remitente: '',
    consignatario: '',
    cantidad: 0,
    peso: 0,
    precio_unitario: 0,
    total: 0,
    contenido: '',
    observacion: '',
    nombres: '',
    ci: '',
    telefono: '',
    efectivo: 0,
    cambio: 0,
    fecha: '',
    hora: ''
  };
  embarco1: any = {
    numero_guia: '',
    nombre: '',
    ci: '',
    telefono: '',
    tipo: 'PAGADO',
    efectivo: 0,
    cambio: 0,
    usuario_id: 0,
    agen_id: 0,
    embarco_id: 0
}
  token;
  type;
  id: any;
  user: any;
  formulario: boolean;
  fragil: any;
  no_declarado: any;
  sin_dinero: any;
  ci:any=[];
  nombreCi:any=[];
  telefonoCi:any=[];
  observacion:any;
  cargando: boolean = true;
  idR:any;
  reimprimir = {
    id: ''
  }
  data:any;

  constructor(
    private modalService: NgbModal,
    private entregaService: DeliveryService,
    private msj:MensajesService,
    private agenciaService: AgenciaService,
    private recepcionService: RecepcionService,
    private crypto: CryptoService
  ) {
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.user = this.crypto.decodeData(localStorage.getItem('identity'));
  }
  ngOnInit() {
    this.obtenerCI();
    this.obtenerNombreCI();
    this.obtenerTelefonoCI();
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.ci.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  search1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.nombreCi.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  search2 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.telefonoCi.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  obtenerCI(){
    this.agenciaService.obtenerCi(this.type, this.token,'').subscribe(res => {


        for (const data in res) {
          this.ci.push(
            res[data]['nombre']
          );

        }

      });
  }
  obtenerNombreCI(){
    this.agenciaService.obtenerNombreCi(this.type, this.token,'').subscribe(res => {


        for (const data in res) {

          this.nombreCi.push(
              res[data]['nombre']
          );

        }

      });
  }
  obtenerTelefonoCI(){
    this.agenciaService.obtenerTelefonoCi(this.type, this.token,'').subscribe(res => {


        for (const data in res) {

          this.telefonoCi.push(
            res[data]['nombre']
          );
        }
      });
  }
  operacion1() {
    if (this.embarco.cantidad >= 0 && this.embarco.precio_unit >= 0) {
      this.embarco.total = this.embarco.cantidad * this.embarco.precio_unitario;
    }
  }
  operacion2() {
    this.embarco.cambio = this.embarco.efectivo - this.embarco.total;
  }
  dataRecovery(event) {
    this.entregaService.detalleGuia(this.type, this.token, event.guia).subscribe(res => {
      this.embarco = {
        guia: event.guia,
        origen: event.origen,
        destino: this.id,
        tipo: res['forma_pago'],
        remitente: res['remitente'],
        consignatario: res['consignatario'],
        cantidad: res['cantidad'],
        peso: res['peso'],
        precio_unitario: res['precio_unit'],
        total: res['total'],
        contenido: res['contenido_encomienda'],
        observacion: res['observaciones']
      };
      this.observaciones(this.embarco.observacion);
    })
    this.formulario = true;
    this.modalService.dismissAll();
  }
  observaciones(data: any) {
    this.observacion=data;
    var fr = /FRAGIL/gi;
    var vnd = /VALOR NO DECLARADO/gi;
    var sdnodv = /SIN DINERO/gi;
    this.fragil = (data.search(fr) == -1) ? false : true;
    this.no_declarado = (data.search(vnd) == -1) ? false : true;
    this.sin_dinero = (data.search(sdnodv) == -1) ? false : true;
  }
  openModal(customContent) {
    this.modalService.open(customContent, { size: 'xl' as 'lg', centered: true, backdrop: 'static', windowClass: 'xl' });
  }
  restaurarFrom(){
    this.embarco=this.embarcoR;
    this.fragil='';
    this.no_declarado='';
    this.sin_dinero='';
    this.observacion='';
  }
  resgistrar(){
    this.entregaService.entregaEmbarco(this.type, this.token, this.embarco1).subscribe(res => {
      if (res['message'] == 'success!') {
          this.idR=res['id'];
           this.msj.mensajeCorrecto('Correcto','La entrega fue realizada exitosamente')
           this.reimprimir.id = this.idR;
           this.recepcionService.reporteReimprecionEntrega(this.reimprimir, this.type, this.token).subscribe(res => {
             this.data={
               cambio:res[0]['cambio'],
               cantidad:parseInt(res[0]['piezas']),
               ci:res[0]['ci_consignatario'],
               consignatario:res[0]['consignatario'],
               contenido:res[0]['descripcion'],
               destino:res[0]['id_agencia_destino'],
               efectivo:res[0]['pagado'],
               fecha:res[0]['fecha'],
               guia:res[0]['guia'],
               hora:res[0]['hora'],
               nombres:res[0]['nombre_consignatario'],
               observacion:res[0]['observacion'],
               origen:res[0]['origen'],
               peso:parseInt(res[0]['peso']),
               precio_unitario:(res[0]['monto']/res[0]['piezas']).toFixed(2),
               remitente:res[0]['remitente'],
               telefono:res[0]['telefono'],
               usuario:res[0]['usuario'],
               tipo:res[0]['tipo'],
               consignatario1:res[0]['nombre_consignatario'],
               total:res[0]['monto'],
             };
             setTimeout(() => {
                this.printDocument();
            }, 1000);
            this.cargando=true;
            this.formulario = false;
            this.restaurarFrom();
           });
      }else{
          this.msj.mensajeError('Error','Error en el registro intetelo de nuevo');
          this.cargando=true;
          this.formulario = false;
          this.restaurarFrom();
      }
  })
}
  onSubmit(){
    this.cargando=false
    this.embarco1.numero_guia = this.embarco.guia;
    this.embarco1.nombre = this.embarco.nombres.toUpperCase();;
    this.embarco1.ci = this.embarco.ci;
    this.embarco1.telefono = this.embarco.telefono;
    this.embarco1.tipo = this.embarco.tipo;
    this.embarco1.efectivo = 0;
    this.embarco1.cambio = 0;
    this.embarco1.usuario_id = this.user.id;
    this.embarco1.agen_id = this.id;

    if (this.embarco.tipo == 'PAGADO'){

        this.resgistrar();
    }else{
      this.embarco1.efectivo = this.embarco.efectivo;
      this.embarco1.cambio = this.embarco.cambio;
      this.resgistrar();

    }
  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice"));
    doc.print();
  }
}
