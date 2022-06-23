import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteTransaccionRoutingModule } from './reporte-transaccion-routing.module';
import { ReporteTransaccionComponent } from './reporte-transaccion.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ReporteTransaccionRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ReporteTransaccionComponent]
})
export class ReporteTransaccionModule { }
