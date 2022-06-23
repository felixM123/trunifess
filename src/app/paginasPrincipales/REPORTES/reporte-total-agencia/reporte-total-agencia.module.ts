import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteTotalAgenciaRoutingModule } from './reporte-total-agencia-routing.module';
import { ReporteTotalAgenciaComponent } from './reporte-total-agencia.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteTotalAgenciaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteTotalAgenciaComponent]
})
export class ReporteTotalAgenciaModule { }
