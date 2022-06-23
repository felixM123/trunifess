import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { RegisterEntryService } from 'src/app/theme/shared/services/register-entry.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-reporte-total-agencia',
  templateUrl: './reporte-total-agencia.component.html',
  styleUrls: ['./reporte-total-agencia.component.scss']
})
export class ReporteTotalAgenciaComponent implements OnInit {
  agenId={
    agen_id:''
  }
  reporteR: any= {
    fecha_al: "",
    fecha_del: "",
    agen_id: 0,
    tipo_transaccion: "",
    tipo: "",
    usuario_id: 0
  };
  reporteEn: any= {
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
  today: any;
  yesterday: any;
  type:any;
  token:any;
  id:any;
  agen_id:any;
  agencias: any;
  usuario_id:any=0;
  usuarios: any;
  reporteT: any;
  expor:any=[];
  reporteE: any;
  reporteI: any;
  reporteS: any;
  totalRecepcion:number=0;
  totalEntregado:number=0;
  totalIngreso:number=0;
  totalSalida:number=0;
  descripcion=[];
  totalCaja:any;
  constructor(private calendar: NgbCalendar,
              private agenciaService: AgenciaService,
              private usuarioService:UsuarioService,
              private recepcionService:RecepcionService,
              private registerService:RegisterEntryService,
              private msj:MensajesService,
              private excelService:ExcelService,
              private crypto: CryptoService
  ){
    this.id=this.crypto.decodeData(localStorage.getItem('id'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
    this.agen_id=0;
   }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerAgencias();
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = res;
    })
  }
  obtenerUsuarios(){
    this.agenId.agen_id=this.id
    this.usuarioService.obtenerUsuarioPorAgencia(this.type,this.token,this.agenId).subscribe(res => {

      this.usuarios=res;
    });
  }
  total(){
    this.totalCaja= ((this.totalRecepcion +this.totalEntregado +this.totalIngreso)-this.totalSalida).toFixed(2);

    }
  generalReporte(){
    this.descripcion=[];
    this.totalCaja='';
    this.reporteRecepcion();
    this.entregad();
    this.listaI();
    this.salidaI();
    if(this.usuario_id==''){
      setTimeout(() => {
        this.usuario_id=0;
       }, 2000);
    }

  }
  reporteRecepcion() {
    this.reporteR.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporteR.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    this.reporteR.agen_id=this.agen_id;
    this.reporteR.usuario_id=this.usuario_id;
    this.reporteR.tipo_transaccion = "RECEPCION";
    this.reporteR.tipo ="PAGADO";
    this.recepcionService.reporteTransaccion(this.reporteR, this.type, this.token).subscribe(res => {
        if ((Object.keys(res).length === 0) == true) {
          this.msj.mensajeAdvertencia('Advertencia','Sin recepciones registradas')
          this.reporteT = res;
          this.totalRecepcion = this.reporteT.reduce(
            (acc, obj) => acc - -obj.monto,0
          );
        } else {
          this.reporteT = res;
          this.totalRecepcion = this.reporteT.reduce(
            (acc, obj) => acc - -obj.monto,0);
        }
      });

  }
  entregad() {

    this.reporteEn.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporteEn.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    this.reporteEn.usuario_id=this.usuario_id;
    this.reporteEn.tipo_transaccion = "ENTREGA";
    this.reporteEn.tipo = "PAGADO";
    this.reporteEn.agen_id=this.agen_id;
    this.recepcionService.reporteTransaccion(this.reporteEn, this.type, this.token).subscribe(res => {
        if ((Object.keys(res).length === 0) == true) {
          this.msj.mensajeAdvertencia('Advertencia','Sin entregas registradas')
          this.reporteE = res;

          this.totalEntregado = this.reporteE.reduce(
            (acc, obj) => acc - -obj.monto,
            0
          );
        } else {
          this.reporteE = res;
          this.totalEntregado = this.reporteE.reduce(
            (acc, obj) => acc - -obj.monto,0);
        }
      });
  }
  listaI() {

    this.reporte1.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    this.reporte1.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    if (this.usuario_id==0) {
      this.usuario_id='';
      this.reporte1.usuario_id=this.usuario_id;
    }else{
      this.reporte1.usuario_id=this.usuario_id;
    }
    this.reporte1.agen_id=this.agen_id
    this.reporte1.tipo_transaccion = "INGRESO EFECTIVO";
    this.registerService.listaIngresos(this.type, this.token, this.reporte1)
      .subscribe(res => {
        if ((Object.keys(res).length === 0) == true) {
          this.msj.mensajeAdvertencia('Advertencia','Sin ingreso de efectivo')
          this.reporteI = res;

          this.totalIngreso = this.reporteI.reduce(
            (acc, obj) => acc - -obj.monto,
            0
          );
        } else {
          this.reporteI = res;
          this.totalIngreso = this.reporteI.reduce(
            (acc, obj) => acc - -obj.monto,0);
        }
      });
  }
  salidaI() {
    this.reporte2.fecha_al = `${this.today.year}-${this.today.month}-${
      this.today.day
    }`;
    this.reporte2.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${
      this.yesterday.day
    }`;
    if (this.usuario_id==0) {
      this.usuario_id='';
      this.reporte2.usuario_id=this.usuario_id;
    }else{
      this.reporte2.usuario_id=this.usuario_id;
    }
    this.reporte2.agen_id=this.agen_id
    this.reporte2.tipo_transaccion = "SALIDA DE EFECTIVO";
    this.registerService.listaEgresos(this.type, this.token, this.reporte2).subscribe(res => {
        if ((Object.keys(res).length === 0) == true) {
          this.msj.mensajeAdvertencia('Advertencia','Sin salida de efectivo')
          this.reporteS = res;
          this.totalSalida = this.reporteS.reduce(
            (acc, obj) => acc - -obj.monto,0);
        } else {
          this.reporteS = res;
          this.totalSalida = this.reporteS.reduce(
            (acc, obj) => acc - -obj.monto,
            0
          );
        }
      });
  }
  exportarXLSX() {

    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.agen_id == res[item].id) {
          this.descripcion.push({agencia:res[item].nombre});
        }
      }
    });
      this.descripcion.push({
        descripcion:this.reporteR.tipo_transaccion,
        subtotal:this.totalRecepcion.toFixed(2)
      });
      this.descripcion.push({
        descripcion:this.reporteEn.tipo_transaccion,
        subtotal:this.totalEntregado.toFixed(2)
      });
      this.descripcion.push({
        descripcion:this.reporte1.tipo_transaccion,
        subtotal:this.totalIngreso.toFixed(2)
      });
      this.descripcion.push({
        descripcion:this.reporte2.tipo_transaccion,
        subtotal:this.totalSalida.toFixed(2)
      });
    setTimeout(() => {
      this.excelService.exportAsExcelFile(this.descripcion, 'Reporte Total Por agencias');
     }, 1000);
  }

}
