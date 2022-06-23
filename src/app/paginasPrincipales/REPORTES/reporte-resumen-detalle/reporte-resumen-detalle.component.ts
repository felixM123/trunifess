import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { ExcelService } from 'src/app/theme/shared/services/excel.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-reporte-resumen-detalle',
  templateUrl: './reporte-resumen-detalle.component.html',
  styleUrls: ['./reporte-resumen-detalle.component.scss']
})
export class ReporteResumenDetalleComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  reporteResumen = {
    fecha: "",
  };
  type: any;
  token: any;
  resumen: any = [];
  saldo: number = 0;
  expor: any = [];
  yesterday: any;
  constructor(private calendar: NgbCalendar,
    private recepcionService: RecepcionService,
    private msj: MensajesService,
    private excelService: ExcelService,
    private crypto: CryptoService)
  {
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
    this.reporteResumen.fecha = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.recepcionService.reporteResumenDetalle(this.reporteResumen, this.type, this.token).subscribe(res => {
      if (Object.keys(res).length === 0 == true) {
        this.msj.mensajeAdvertencia('Advertencia', 'No es encuentran informe');
        this.resumen = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      } else {
        this.resumen = [];
        for (const data in res) {
          this.resumen.push({
            agencia: res[data]['agencia'],
            fecha: res[data]['fecha'],
            tipo_transaccion: res[data]['tipo_transaccion'],
            tipo: res[data]['tipo'],
            valor_ingreso: res[data]['valor_ingreso'],
            valor_egreso: res[data]['valor_egreso'],
            saldo: this.saldo = this.saldo + (parseFloat(res[data]['valor_ingreso'])) - (parseFloat(res[data]['valor_egreso'])),
          })
        }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }
    });
  }
  exportarXLSX() {
    this.excelService.exportAsExcelFile(this.resumen, 'Informe dia Detalle');
  }

}
