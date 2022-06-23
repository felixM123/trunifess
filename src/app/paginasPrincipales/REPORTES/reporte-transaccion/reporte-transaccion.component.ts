import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { RegisterEntryService } from 'src/app/theme/shared/services/register-entry.service';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { Subject } from 'rxjs';
import { DataTableDirective,DataTablesModule } from 'angular-datatables';
import { Component, OnInit,QueryList,OnDestroy,AfterViewInit,ViewChildren} from '@angular/core';
import 'rxjs/add/operator/map'
import { Router, ActivatedRoute } from '@angular/router';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';


@Component({
  selector: 'app-reporte-transaccion',
  templateUrl: './reporte-transaccion.component.html',
  styleUrls: ['./reporte-transaccion.component.scss']
})
export class ReporteTransaccionComponent implements AfterViewInit,OnInit {
  @ViewChildren(DataTableDirective)
  dtElements:QueryList<DataTableDirective>;
  // dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings={};
  reporteR: any = {
    fecha_al: "",
    fecha_del: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    usuario_id: 0
  };
  reporteEn: any = {
    fecha_al: "",
    fecha_del: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    usuario_id: 0
  };
  reporte1: any = {
    fecha_al: "",
    fecha_del: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    usuario_id: 0
  };
  reporte2: any = {
    fecha_al: "",
    fecha_del: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    usuario_id: 0
  };
  reporteT: any=[];
  reporteE: any;
  reporteI: any;
  reporteS: any;
  today: any;
  yesterday: any;
  id: any;
  type: any;
  token: any;
  usuario_id:any=0;
  usuarios: any;
  agenId = {
    agen_id: ""
  };
  totalCaja:any;
  totalRecepcion: number = 0;
  totalEntregado: number = 0;
  totalIngreso: number = 0;
  totalSalida: number = 0;
  expor:any=[];
  expor1:any=[];
  expor2:any=[];
  expor3:any=[];
  cargando:boolean=true;
  agen1:any;
  agen_id:any;
  agencias: any;
  titulo:any;
  constructor(private calendar: NgbCalendar,
              private recepcionService: RecepcionService,
              private msj:MensajesService,
              private registerService: RegisterEntryService,
              private usuarioService: UsuarioService,
              private excelService:ExcelService,
              private route: ActivatedRoute,
              private agenciaService: AgenciaService,
              private crypto: CryptoService)
  {
    this.id = this.crypto.decodeData(localStorage.getItem("id"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getToday();
   }
  ngOnInit() {
    this.agen1=this.route.snapshot.params['1'];
    if (this.agen1) {
      this.agen_id=0;
      this.obtenerAgencias();
      this.titulo='Reporte de Transacciones por Agencia'
    }else{
      this.titulo='Reporte de Transacciones'
      this.reporteR.agen_id = this.id;
      this.reporteEn.agen_id = this.id;
      this.reporte1.agen_id = this.id;
      this.reporte2.agen_id = this.id;
    }
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
    this.obtenerUsuarios();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = res;
    })
  }
  opciones(){
    this.dtOptions = {
      destroy:true,
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

  obtenerUsuarios() {
    this.agenId.agen_id = this.id;
    this.usuarioService
      .obtenerUsuarioPorAgencia(this.type, this.token, this.agenId)
      .subscribe(res => {
        this.usuarios = res;
      });
  }
  generalReporte(){

    this.reporteRecepcion();
    // this.reporteEntregado();
    setTimeout(() => {
      this.reporteEntregado();
     }, 2000);
     setTimeout(() => {
      this.listaIngresos();
     }, 2000);
     setTimeout(() => {
      this.salidaIngresos();
     }, 2000);


    if(this.usuario_id==''){
      setTimeout(() => {
        this.usuario_id=0;
       }, 2000);
    }

  }
  reporteRecepcion() {
    this.cargando=false;
    this.opciones();
    this.reporteR.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporteR.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    if (this.agen1) {
      this.reporteR.agen_id=this.agen_id;
    }
    this.reporteR.usuario_id=this.usuario_id;
    this.reporteR.tipo_transaccion = "RECEPCION";
    this.reporteR.tipo ="PAGADO";
    this.recepcionService.reporteTransaccion(this.reporteR, this.type, this.token).subscribe(res => {
        if ((Object.keys(res).length === 0) == true) {
          this.msj.mensajeAdvertencia('Advertencia','Sin transacciones registradas')
          this.reporteT = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })

          this.totalRecepcion = this.reporteT.reduce(
            (acc, obj) => acc - -obj.monto,0);
        } else {
          this.reporteT = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalRecepcion = this.reporteT.reduce(
            (acc, obj) => acc - -obj.monto,0);
        }
      },error=>{
        this.msj.mensajeError('Error','Error intentelo de nuevo');
      });
  }
  reporteEntregado(){
    this.opciones();
    this.reporteEn.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporteEn.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    if (this.agen1) {
      this.reporteEn.agen_id=this.agen_id;
    }
    this.reporteEn.usuario_id=this.usuario_id;
    this.reporteEn.tipo_transaccion = "ENTREGA";
    this.reporteEn.tipo = "PAGADO";
    this.recepcionService.reporteTransaccion(this.reporteEn, this.type, this.token).subscribe(res => {

        if ((Object.keys(res).length === 0) == true) {
          this.reporteE = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalEntregado = this.reporteE.reduce((acc, obj) => acc - -obj.monto,0);
        } else {
          this.reporteE = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalEntregado = this.reporteE.reduce((acc, obj) => acc - -obj.monto,0);
        }
      },error=>{
        this.msj.mensajeError('Error','Error intentelo de nuevo');
      });
  }
  listaIngresos(){
    this.opciones();
    this.reporte1.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    this.reporte1.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    if (this.agen1) {
      this.reporte1.agen_id=this.agen_id;
    }
    if (this.usuario_id==0) {
      this.usuario_id='';
      this.reporte1.usuario_id=this.usuario_id;
    }else{
      this.reporte1.usuario_id=this.usuario_id;
    }

    this.reporte1.tipo_transaccion = "INGRESO EFECTIVO";
    this.registerService.listaIngresos(this.type, this.token, this.reporte1)
      .subscribe(res => {

        if ((Object.keys(res).length === 0) == true) {
          this.reporteI = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalIngreso = this.reporteI.reduce(
            (acc, obj) => acc - -obj.monto,
            0
          );
        } else {
          this.reporteI = res;

          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalIngreso = this.reporteI.reduce((acc, obj) => acc - -obj.monto,0);
        }
      });
  }
  salidaIngresos(){
    this.opciones();
    this.reporte2.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporte2.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    if (this.agen1) {
      this.reporte2.agen_id=this.agen_id;
    }
    if (this.usuario_id==0) {
      this.usuario_id='';
      this.reporte2.usuario_id=this.usuario_id;
    }else{
      this.reporte2.usuario_id=this.usuario_id;
    }
    this.reporte2.tipo_transaccion = "SALIDA DE EFECTIVO";

    this.registerService.listaEgresos(this.type, this.token, this.reporte2).subscribe(res => {

        if ((Object.keys(res).length === 0) == true) {
          this.reporteS = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalSalida = this.reporteS.reduce(
            (acc, obj) => acc - -obj.monto,0);
        } else {
          this.reporteS = res;
          this.dtElements.forEach((dtElement:DataTableDirective)=>{
            dtElement.dtInstance.then((dtInstance:DataTables.Api)=>{
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            })
          })
          this.totalSalida = this.reporteS.reduce(
            (acc, obj) => acc - -obj.monto,
            0
          );
        }
      });
      this.cargando=true;
  }
  XLSXexportar(){
    this.exportarXLSX();
    this.exportarXLSX1();
    this.exportarXLSX2();
    this.exportarXLSX3();
    this.excelService.exportAsExcelFile1(this.expor,this.expor1,this.expor2,this.expor3, 'Reporte transaccion');
  }
  exportarXLSX() {

      this.expor=[];
      for (const data in this.reporteT) {
        this.expor.push({
          Numero_guia:this.reporteT[data]['numero_guia'],
          fecha:this.reporteT[data]['fecha'],
          hora:this.reporteT[data]['hora'],
          tipo_transaccion:this.reporteT[data]['tipo_transaccion'],
          tipo:this.reporteT[data]['tipo'],
          monto:this.reporteT[data]['monto'],
          observacion:this.reporteT[data]['observacion'],
          usuario:this.reporteT[data]['usuario'],
        });
    }


  }
  exportarXLSX1() {

    this.expor1=[];
    for (const data in this.reporteE) {
      this.expor1.push({
        Numero_guia:this.reporteE[data]['numero_guia'],
        fecha:this.reporteE[data]['fecha'],
        hora:this.reporteE[data]['hora'],
        tipo_transaccion:this.reporteE[data]['tipo_transaccion'],
        tipo:this.reporteE[data]['tipo'],
        monto:this.reporteE[data]['monto'],
        observacion:this.reporteE[data]['observacion'],
        usuario:this.reporteE[data]['usuario'],
      });
  }


}
exportarXLSX2() {
  this.expor2=[];
  for (const data in this.reporteI) {
    this.expor2.push({
      Numero_transaccion:this.reporteI[data]['num_transaccion'],
      tipo_transaccion:this.reporteI[data]['tipo_transaccion'],
      fecha:this.reporteI[data]['fecha'],
      tipo:this.reporteI[data]['tipo'],
      detalle:this.reporteI[data]['detalle'],
      monto:this.reporteI[data]['monto'],
      usuario:this.reporteI[data]['usuario'],
    });
}



}
exportarXLSX3() {
  this.expor3=[];
  for (const data in this.reporteS) {
    this.expor3.push({
      Numero_transaccion:this.reporteS[data]['num_transaccion'],
      tipo_transaccion:this.reporteS[data]['tipo_transaccion'],
      fecha:this.reporteS[data]['fecha'],
      tipo:this.reporteS[data]['tipo'],
      detalle:this.reporteS[data]['detalle'],
      monto:this.reporteS[data]['monto'],
      usuario:this.reporteS[data]['usuario'],
    });
  }

}
total(){
  this.totalCaja = ((this.totalRecepcion +this.totalEntregado +this.totalIngreso)-this.totalSalida).toFixed(2);
}

}
