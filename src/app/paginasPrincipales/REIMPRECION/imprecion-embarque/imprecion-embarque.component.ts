import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Reportetransaccion } from 'src/app/theme/shared/models/reporteRecepcion';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { DecimalPipe } from '@angular/common';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import * as wjcCore from "wijmo/wijmo";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-imprecion-embarque',
  templateUrl: './imprecion-embarque.component.html',
  styleUrls: ['./imprecion-embarque.component.scss'],
  providers: [DecimalPipe]
})
export class ImprecionEmbarqueComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  reporte: Reportetransaccion = {
    fecha_del: '',
    fecha_al: '',
    agen_id: 0,
    tipo_transaccion: '',
    tipo: '',
    usuario_id:0
  }
  objeto = {
    id: '',
    nombre_comercial: "",
    contacto: "",
    nit: "",
    nombre_factura: ""
  }
  reimprimir={
    id:''
  }
  reimprimir1={
    id_embarque:''
  }
  today: any;
  yesterday: any;
  id;
  type: any;
  token: any;
  agencias1: any;
  agencias: any;
  rows = [];
  temp = [];
  clientesBus: any[];
  reporteT: any;
  arreglo:any;
  dato: any;
  dato1: any;
  expor:any[];
  origen:any={};
  agenciaOrigen:any;
  data:any;
  embarco:any=[];
  cantidad:any=0;
  total:any;
  suma: number = 0;
  constructor(private calendar: NgbCalendar,
              private agenciaService: AgenciaService,
              private pipe: DecimalPipe,
              private clieteService: ClienteService,
              private recepcionService:RecepcionService,
              private msj:MensajesService,
              private excelService:ExcelService,
              private crypto: CryptoService
              )
  {
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
  }

  ngOnInit() {
    this.opciones();
    this.obtenerAgencias();
    this.obtenerAgenciasOrigen();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  opciones(){
    this.dtOptions = {
     pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        'search': 'Buscar',
        "emptyTable": "No hay información",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        'paginate': {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
    };
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias1 = res;
    })
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
    this.objeto.contacto = item.contacto;
    this.objeto.nombre_factura = item.nombre_comercial;
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
  obtenerAgenciaNombre() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.reporte.agen_id == res[item].id) {
            this.agenciaOrigen=res[item].nombre;
        } else {
        }
    }
    })
  }
  obtenerAgenciasOrigen() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias.push(res[item]);
        }
        else {
          if (this.id == res[item].id) {
            this.origen = res[item]
          }
        }
      }
    });
  }
  reporteRecepcion(){
    this.opciones();
    this.reporte.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
    this.reporte.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.reporte.tipo_transaccion="EMBARQUE";
    this.reporte.tipo="";
         this.recepcionService.reporteTransaccion(this.reporte,this.type,this.token).subscribe(res=>{
          if(Object.keys(res).length === 0 == true){
            this.reporteT=res;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
            });
            this.msj.mensajeAdvertencia('Advertencia','Sin transacciones registradas');
            this.agenciaOrigen='';
          }else{
            this.obtenerAgenciaNombre();
            this.reporteT=res;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
            });
          }
    })
  }
  imprimir(item){
    this.reimprimir1.id_embarque=item.id;
    this.recepcionService.reporteDetalleEmbarque(this.reimprimir1,this.type,this.token).subscribe(res=>{
      this.embarco=res;
      this.cantidad=this.embarco.length;
      for (let i = 0; i < this.embarco.length; i++) {
        this.suma = this.suma + this.embarco[i]['cantidad'];
      }
      this.total=this.cantidad;
      this.reimprimir.id=item.id;
      this.recepcionService.reporteReimprecionEmbarque(this.reimprimir,this.type,this.token).subscribe(res=>{
        this.data={
          tipo: 'EMBARQUE',
          destino: res[0]['destino'],
          origen: this.origen,
          camion:res[0]['placa_camion'],
          chofer: res[0]['chofer'],
          usuario_id: res[0]['usuario'],
          embarco: this.embarco,
          transaccion: res[0]['numero'],
          fecha: res[0]['fecha'],
          total: this.total,
          totalPaquetes: this.suma,
          hora:res[0]['hora']
        };
        setTimeout(() => {
          this.printDocument();
         this.cantidad=0;
         this.suma=0;
        }, 1000);
      })
    })
  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice"));
    doc.print();
  }
  exportarXLSX() {
    this.expor=[];
    for (const data in this.reporteT) {
      this.expor.push({
        Id:this.reporteT[data]['id'],
        fecha:this.reporteT[data]['fecha'],
        hora:this.reporteT[data]['hora'],
        origen:this.agenciaOrigen,
        destino:this.reporteT[data]['agencia_destino_origen'],
        tipo_transaccion:this.reporteT[data]['tipo_transaccion'],
        chofer:this.reporteT[data]['chofer'],
        placa_camion:this.reporteT[data]['placa_camion'],
        usuario:this.reporteT[data]['usuario']
      });
  }
  this.excelService.exportAsExcelFile(this.expor, 'IMPRECION EMBARQUE');
}
}
