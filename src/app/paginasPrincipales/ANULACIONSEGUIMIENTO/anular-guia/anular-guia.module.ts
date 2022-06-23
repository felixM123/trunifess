import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnularGuiaRoutingModule } from './anular-guia-routing.module';
import { AnularGuiaComponent } from './anular-guia.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    AnularGuiaRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [AnularGuiaComponent]
})
export class AnularGuiaModule { }
