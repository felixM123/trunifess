import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Reporterecepcion } from 'src/app/theme/shared/models/reporteRecepcion';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { ClienteService } from 'src/app/theme/shared/services/cliente.service';
import { DecimalPipe } from '@angular/common';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-reporte-transaccion-entrega',
  templateUrl: './reporte-transaccion-entrega.component.html',
  styleUrls: ['./reporte-transaccion-entrega.component.scss'],
  providers: [DecimalPipe]
})
export class ReporteTransaccionEntregaComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objeto = {
    id: '',
    nombre_comercial: "",
    contacto: "",
    nit: "",
    nombre_factura: ""
  }
  reporte:Reporterecepcion={
    fecha_del:'',
    fecha_al:'',
    agen_id:'',
    cliente_id:'',
    tipo:'',
    agen_id_destino:''
  }
  kind = [{id:0,nombre:'TODO'},{id:1,nombre:'PAGADO'}, {id:2,nombre:'POR PAGAR EN DESTINO'}];
  today: any;
  yesterday: any;
  id: any;
  type: any;
  token: any;
  agencias: Agencia[];
  clientesBus: any[];
  rows = [];
  temp = [];
  totalRecepcion:any;
  reporteT:any;
  expor:any=[];
  cargando:boolean=true;
  constructor(private calendar: NgbCalendar,
              private agenciaService: AgenciaService,
              private clieteService: ClienteService,
              private pipe: DecimalPipe,
              private recepcionService:RecepcionService,
              private msj:MensajesService,
              private excelService:ExcelService,
              private crypto: CryptoService
    )
  {
    this.id = this.crypto.decodeData(localStorage.getItem("id"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday(), 'd', 10);
    this.reporte.agen_id_destino='0';
    this.reporte.tipo='TODO';
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
      this.agencias = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias.push(res[item]);
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
  reporteRecepcion(){
    this.cargando=false;
    this.opciones();
    if(this.reporte.tipo=='TODO'){
      this.reporte.tipo='0';
    }
    this.reporte.cliente_id=this.objeto.id;
    this.reporte.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
    this.reporte.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.reporte.agen_id=this.id;

    this.recepcionService.reporteRecepcion(this.reporte,this.type,this.token).subscribe(res=>{
      if(Object.keys(res).length === 0 == true){
       this.reporteT=res;
       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
      this.cargando=true;
      this.msj.mensajeAdvertencia('Advertencia','No hay reporte de recepcion de entrega');
       this.totalRecepcion = this.reporteT.reduce(
        (acc, obj) => acc - -obj.monto,0
      );
      }else{
        this.reporteT=res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.cargando=true;
        this.totalRecepcion = this.reporteT.reduce(
          (acc, obj) => acc - -obj.monto,0
        );
      }
    })
    setTimeout(() => {
      this.reporte.tipo='TODO';
    }, 2000);

}
exportarXLSX() {
  for (const data in this.reporteT) {
    this.expor.push({

      guia:this.reporteT[data]['guia'],
      tipo:this.reporteT[data]['tipo'],
      descripcion:this.reporteT[data]['descripcion'],
      consignatario:this.reporteT[data]['consignatario'],
      origen:this.reporteT[data]['origen'],
      destino:this.reporteT[data]['destino'],
      peso:this.reporteT[data]['peso'],
      piezas:this.reporteT[data]['piezas'],
      monto:this.reporteT[data]['monto'],
      usuario:this.reporteT[data]['usuario'],
      fecha: this.reporteT[data]['fecha'],
      fecha_Entrega:this.reporteT[data]['fecha_entrega']

    });



}

this.excelService.exportAsExcelFile(this.expor, 'RECEPCION/ENTREGA');
}

}
