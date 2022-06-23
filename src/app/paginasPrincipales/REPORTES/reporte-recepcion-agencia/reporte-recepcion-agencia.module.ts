import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteRecepcionAgenciaRoutingModule } from './reporte-recepcion-agencia-routing.module';
import { ReporteRecepcionAgenciaComponent } from './reporte-recepcion-agencia.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteRecepcionAgenciaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteRecepcionAgenciaComponent]
})
export class ReporteRecepcionAgenciaModule { }
