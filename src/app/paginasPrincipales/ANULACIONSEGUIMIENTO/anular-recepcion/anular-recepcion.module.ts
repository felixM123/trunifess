import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnularRecepcionRoutingModule } from './anular-recepcion-routing.module';
import { AnularRecepcionComponent } from './anular-recepcion.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    AnularRecepcionRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [AnularRecepcionComponent]
})
export class AnularRecepcionModule { }
