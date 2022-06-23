import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteResumenTotalRoutingModule } from './reporte-resumen-total-routing.module';
import { ReporteResumenTotalComponent } from './reporte-resumen-total.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteResumenTotalRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteResumenTotalComponent]
})
export class ReporteResumenTotalModule { }
