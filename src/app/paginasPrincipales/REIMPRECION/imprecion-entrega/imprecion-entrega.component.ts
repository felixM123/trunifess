import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { DecimalPipe } from '@angular/common';
import { Reportetransaccion } from 'src/app/theme/shared/models/reporteRecepcion';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import * as wjcCore from "wijmo/wijmo";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-imprecion-entrega',
  templateUrl: './imprecion-entrega.component.html',
  styleUrls: ['./imprecion-entrega.component.scss'],
  providers: [DecimalPipe]
})
export class ImprecionEntregaComponent implements AfterViewInit,OnInit {
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
  data:any;
  today: any;
  yesterday: any;
  id;
  type: any;
  token: any;
  agencias: any;
  rows = [];
  temp = [];
  clientesBus: any[];
  reporteT: any;
  expor:any[];
  constructor(
              private calendar: NgbCalendar,
              private agenciaService: AgenciaService,
              private pipe: DecimalPipe,
              private clieteService: ClienteService,
              private recepcionService: RecepcionService,
              private msj:MensajesService,
              private excelService:ExcelService,
              private crypto: CryptoService
  ) {
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
   }

  ngOnInit() {
    this.opciones();
    this.obtenerAgencias();
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
        "emptyTable": "No hay informaci??n",
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
      this.agencias = res;
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
  reporteRecepcion() {
    this.opciones();
    this.reporte.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
    this.reporte.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.reporte.tipo_transaccion = "ENTREGA";
    this.reporte.tipo="";
    this.recepcionService.reporteTransaccion(this.reporte, this.type, this.token).subscribe(res => {

      if(Object.keys(res).length === 0 == true){
        this.reporteT = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.msj.mensajeAdvertencia('Advertencia','No es encuentran recepciones')
      }else{
        this.reporteT = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }
    });
  }
  imprimir(item) {
    this.reimprimir.id=item.id;
    this.recepcionService.reporteReimprecionEntrega(this.reimprimir,this.type,this.token).subscribe(res=>{
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
      Numero_transaccion:this.reporteT[data]['numero_guia'],
      fecha:this.reporteT[data]['fecha'],
      hora:this.reporteT[data]['hora'],
      tipo:this.reporteT[data]['tipo'],
      tipo_transaccion:this.reporteT[data]['tipo_transaccion'],
      observacion:this.reporteT[data]['observacion'],
      monto:this.reporteT[data]['monto'],
      usuario:this.reporteT[data]['usuario']
    });
}
this.excelService.exportAsExcelFile(this.expor, 'IMPRECION ENTREGA');
}
}
