import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-reporte-resumen-total',
  templateUrl: './reporte-resumen-total.component.html',
  styleUrls: ['./reporte-resumen-total.component.scss']
})
export class ReporteResumenTotalComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  reporteResumen = {
    fecha: "",
  };
  type: any;
  token: any;
  yesterday: any;
  resumen: any;
  expor:any=[];
  total1: number=0;
  total2: number=0;
  total3: number=0;
  total4: number=0;
  total5: number=0;
  total6: number=0;
  total7: number=0;
  total8: number=0;
  total9: number=0;
  total10: number=0;
  total11: number=0;
  constructor(private calendar: NgbCalendar,
              private recepcionService: RecepcionService,
              private msj: MensajesService,
              private excelService:ExcelService,
              private crypto: CryptoService) {
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.yesterday = this.calendar.getToday();
  }
  ngOnInit() {
    this.opciones();
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
  reporteRecepcion() {
    this.opciones();
    this.reporteResumen.fecha = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.recepcionService.reporteResumen(this.reporteResumen, this.type, this.token).subscribe(res => {

      if (Object.keys(res).length === 0 == true) {
        this.msj.mensajeAdvertencia('Advertencia', 'No es encuentran informe.....!')
        this.resumen = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.total1=0;
        this.total2=0;
        this.total3=0;
        this.total4=0;
        this.total5=0;
        this.total6=0;
        this.total7=0;
        this.total8=0;
        this.total9=0;
        this.total10=0;
        this.total11=0;
      } else {
        this.resumen = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.total1 = this.resumen.reduce((acc, obj) => acc - -obj.saldo_anterior, 0);
        this.total2 = this.resumen.reduce((acc, obj) => acc - -obj.recepcion_pagado, 0);
        this.total3 = this.resumen.reduce((acc, obj) => acc - -obj.entrega_pagado, 0);
        this.total4 = this.resumen.reduce((acc, obj) => acc - -obj.recepcion_fact, 0);
        this.total5 = this.resumen.reduce((acc, obj) => acc - -obj.entrega_fact, 0);
        this.total6 = this.resumen.reduce((acc, obj) => acc - -obj.ingreso_oficina, 0);
        this.total7 = this.resumen.reduce((acc, obj) => acc - -obj.corporativo, 0);
        this.total8 = this.resumen.reduce((acc, obj) => acc - -obj.gastos_oficina, 0);
        this.total9 = this.resumen.reduce((acc, obj) => acc - -obj.subtotal, 0);
        this.total10 = this.resumen.reduce((acc, obj) => acc - -obj.traspaso_banco, 0);
        this.total11 = this.resumen.reduce((acc, obj) => acc - -obj.total, 0);
      }
    });
  }
  exportarXLSX() {
    this.expor=[];
    for (const data in this.resumen) {
      this.expor.push({
        sucursal:this.resumen[data]['sucursal'],
        Saldo_Dia_Anterior:this.resumen[data]['saldo_anterior'],
        Guias_Efectivo:this.resumen[data]['recepcion_pagado'],
        Guias_por_Pagar_Entregados:this.resumen[data]['entrega_pagado'],
        Guias_Efectivo_Transoft:this.resumen[data]['recepcion_fact'],
        Guias_por_Pagar_entregados_transoft:this.resumen[data]['entrega_fact'],
        Guias_Manuales:this.resumen[data]['ingreso_oficina'],
        Guias_Corporativos:this.resumen[data]['corporativo'],
        Gastos_oficina:this.resumen[data]['gastos_oficina'],
        Caja_Efectivo:this.resumen[data]['subtotal'],
        Traspaso_de_Caja_a_Banco:this.resumen[data]['traspaso_banco'],
        Saldo_en_Caja:this.resumen[data]['total'],
      });
  }
    this.excelService.exportAsExcelFile(this.expor, 'Informe dia');
  }
}
