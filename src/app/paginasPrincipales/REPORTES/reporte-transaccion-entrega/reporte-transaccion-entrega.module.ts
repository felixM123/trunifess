import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteTransaccionEntregaRoutingModule } from './reporte-transaccion-entrega-routing.module';
import { ReporteTransaccionEntregaComponent } from './reporte-transaccion-entrega.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteTransaccionEntregaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteTransaccionEntregaComponent]
})
export class ReporteTransaccionEntregaModule { }
