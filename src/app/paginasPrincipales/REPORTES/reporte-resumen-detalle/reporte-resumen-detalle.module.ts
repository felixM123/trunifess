import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteResumenDetalleRoutingModule } from './reporte-resumen-detalle-routing.module';
import { ReporteResumenDetalleComponent } from './reporte-resumen-detalle.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteResumenDetalleRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteResumenDetalleComponent]
})
export class ReporteResumenDetalleModule { }
