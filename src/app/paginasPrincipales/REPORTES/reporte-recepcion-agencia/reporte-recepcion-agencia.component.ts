import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Reporterecepcion } from 'src/app/theme/shared/models/reporteRecepcion';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import { DecimalPipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-reporte-recepcion-agencia',
  templateUrl: './reporte-recepcion-agencia.component.html',
  styleUrls: ['./reporte-recepcion-agencia.component.scss'],
  providers: [DecimalPipe]
})
export class ReporteRecepcionAgenciaComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  reporte: Reporterecepcion = {
    fecha_del: '',
    fecha_al: '',
    agen_id: '',
    cliente_id: '',
    tipo: '',
    agen_id_destino: ''
  }
  objeto = {
    id: '',
    nombre_comercial: "",
    contacto: "",
    nit: "",
    nombre_factura: ""
  }
  kind = ['TODO', 'PAGADO', 'POR PAGAR EN DESTINO'];
  agencias: any;
  agencias1: Agencia[];
  id: any;
  tipo: any;
  today: any;
  yesterday: any;
  type: any;
  token: any;
  clientesBus: any[];
  rows = [];
  temp = [];
  reporteT: any;
  expor: any = [];
  constructor(private agenciaService: AgenciaService,
    private calendar: NgbCalendar,
    private clieteService: ClienteService,
    private pipe: DecimalPipe,
    private recepcionService: RecepcionService,
    private msj: MensajesService,
    private excelService: ExcelService,
    private crypto: CryptoService)
  {
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
    this.reporte.agen_id = '0';
    this.reporte.agen_id_destino = '0';
    this.tipo = 'TODO';
  }

  ngOnInit() {
    this.opciones();
    this.obtenerAgencias();
    this.obtenerAgencias1();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  opciones() {
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
      this.agencias = res;
    })
  }
  obtenerAgencias1() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias1 = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias1.push(res[item]);
        }
      }
    });
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
  registrar() {
    this.reporte.cliente_id = this.objeto.id;
    this.reporte.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
    this.reporte.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.recepcionService.reporteRecepcionTodo(this.reporte, this.type, this.token).subscribe(res => {
      if (Object.keys(res).length === 0 == true) {
        this.msj.mensajeAdvertencia('Advertencia', 'Sin transacciones registradas')
        this.reporteT = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      } else {
        this.reporteT = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }
    })
  }
  reporteRecepcion() {
    if (this.tipo == 'TODO') {
      this.reporte.tipo = '0';
      this.registrar();
    } else {
      this.reporte.tipo = this.tipo;
      this.registrar();
    }
  }
  exportarXLSX() {
    this.expor = [];
    for (const data in this.reporteT) {
      this.expor.push({
        Numero_guia: this.reporteT[data]['guia'],
        fecha: this.reporteT[data]['fecha'],
        tipo: this.reporteT[data]['tipo'],
        descripcion: this.reporteT[data]['descripcion'],
        consignatario: this.reporteT[data]['consignatario'],
        monto: this.reporteT[data]['monto'],
        origen: this.reporteT[data]['origen'],
        destino: this.reporteT[data]['destino'],
        piezas: this.reporteT[data]['piezas'],
        fecha_entrega: this.reporteT[data]['fecha_entrega'],
      });
    }
    this.excelService.exportAsExcelFile(this.expor, 'RECEPCION - AGENCIAS');
  }
}
