import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprecionEntregaRoutingModule } from './imprecion-entrega-routing.module';
import { ImprecionEntregaComponent } from './imprecion-entrega.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ImprecionEntregaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ImprecionEntregaComponent]
})
export class ImprecionEntregaModule { }
