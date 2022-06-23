import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnularEntregaRoutingModule } from './anular-entrega-routing.module';
import { AnularEntregaComponent } from './anular-entrega.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    AnularEntregaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [AnularEntregaComponent]
})
export class AnularEntregaModule { }
