import { Component, OnInit,AfterViewInit,ViewChild  } from '@angular/core';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { RegisterEntryService } from 'src/app/theme/shared/services/register-entry.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { DataTableDirective } from 'angular-datatables';
import { RegisterEntryComponent } from '../register-entry/register-entry.component';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { Literal } from 'src/app/theme/shared/models/literal';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import * as wjcCore from "wijmo/wijmo";
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-ingreso-dinero',
  templateUrl: './ingreso-dinero.component.html',
  styleUrls: ['./ingreso-dinero.component.scss'],
  providers: [Literal]
})
export class IngresoDineroComponent implements AfterViewInit,OnInit  {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  today: any;
  yesterday: any;
  type;
  token;
  data: any = {
    fecha_del: '',
    fecha_al: '',
    agen_id: 0,
    tipo_transaccion: '',
    tipo: '',
    observacion: '',
    usuario_id: ''
  }
  id: any;
  kind = [
    "TODAS",
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
    "CORPORATIVO"

  ];
  lista: any[];
  expor:any[];
  reimprimir = {
    id: ''
  }
  ingreso:any=[];
  literal;
  monto:any;
  dato:any;
  agenPropio:any;
  agencias: any[];
  origen:any;
  cargando:boolean=true;
  constructor(private calendar: NgbCalendar,
    private registroService: RegisterEntryService,
    private modalService: NgbModal,
    private msj: MensajesService,private excelService:ExcelService,
    private lit: Literal,
    private agenciaService: AgenciaService,
    private crypto: CryptoService
    )
  {
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.data.agen_id = this.crypto.decodeData(localStorage.getItem('id'));
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.data.tipo = 'TODAS';
  }
  ngOnInit() {
    this.opciones();
    this.listado();
    this.obtenerAgencias();
    this.dato='';
  }
  opciones(){
    this.dtOptions = {
     pagingType: 'full_numbers',
      pageLength: 8,
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
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  listar() {
   this.opciones();
    this.registroService.listaIngresos(this.type, this.token, this.data).subscribe(res => {
      if (Object.keys(res).length === 0 == true) {
        this.lista = [];
        for (const key in res) {
          this.lista.push(res[key]);
        }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.msj.mensajeAdvertencia('Advertancia', 'No hay ingresos de efectivo')
      } else {
        this.lista = [];
        for (const key in res) {
          this.lista.push(res[key]);
        }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }
    })
  }
  listado() {
    if (this.data.tipo == 'TODAS') {
      this.data.tipo = '';
      this.data.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
      this.data.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
      this.data.tipo_transaccion = "INGRESO EFECTIVO";
      this.listar();
      setTimeout(() => {
        this.data.tipo = 'TODAS';
      }, 1000);
    }else{
      this.data.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
      this.data.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
      this.data.tipo_transaccion="INGRESO EFECTIVO";
      this.listar();
      setTimeout(() => {
        this.data.tipo='TODAS';
      }, 1000);
    }
  }
  openModal(content) {
    const modalRef = this.modalService.open(RegisterEntryComponent, {
      size: "xl" as "lg", centered: true, backdrop: "static", windowClass: "dark-modal"
    });
    modalRef.componentInstance.encabezado = content;
    modalRef.result.then((result) => {
      // console.log(result);
    }, (reason) => {
      if (reason == 'Success') {
        window.location.reload();
        // form.reset();
      };
    });
  }
  exportarXLSX() {
    this.expor=[];
    for (const data in this.lista) {
      this.expor.push({
        Numero_transaccion:this.lista[data]['num_transaccion'],
        tipo_transaccion:this.lista[data]['tipo_transaccion'],
        fecha:this.lista[data]['fecha'],
        tipo:this.lista[data]['tipo'],
        detalle:this.lista[data]['detalle'],
        monto:this.lista[data]['monto'],
        usuario:this.lista[data]['usuario'],
      });
  }
  this.excelService.exportAsExcelFile(this.expor, 'INGRESO DE EFECTIVO');
}
obtenerAgencias() {
  this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
          if (this.id == res[item].id) {
              this.agenPropio = res[item]['nombre'];

              this.origen=this.agenPropio;
          } else {
          }
      }
  });

}
imprimir(item){
  this.cargando=false;
  this.reimprimir.id=item;
  this.registroService.reporteDetalleIngreso(this.reimprimir,this.type,this.token).subscribe(res=>{
    for (const data in res) {
      this.ingreso.push({
        nombre: res[data]['detalle'],
        valor: res[data]['monto'],
      });
    }
    this.registroService.reporteReimprecionIngreso(this.reimprimir,this.type,this.token).subscribe(res=>{
      this.monto=res[0]['monto'],
      this.literal = this.lit.numeroALetras(this.monto, {
        plural: "Bolivianos",
        singular: "Bolivianos",
        centPlural: "Bolivianos",
        centSingular: "Bolivianos"
      });
      this.dato={
        hora1:res[0]['hora'],
        numero_transaccion1:res[0]['numero'],
        tipo:res[0]['tipo'],
        titulo:'REGISTRO DE INGRESO DE EFECTIVO',
        de: res[0]['de'],
        para: res[0]['para'],
        fecha: res[0]['fecha'],
        detalle: res[0]['observacion'],
        monto:res[0]['monto'],
        literal: this.literal,
        detalles: this.ingreso,
        origen:this.origen
      };

      setTimeout(() => {
      this.printDocument();
       this.ingreso=[];
       this.dato='';
      }, 2000);
      this.cargando=true;
    });
});
}
printDocument() {
  var doc = new wjcCore.PrintDocument();
  doc.append(document.getElementById("invoice"));
  doc.print();
}
}
