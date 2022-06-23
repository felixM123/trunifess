import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionComponent } from './recepcion.component';
import {SharedModule} from '../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../pages.module';
@NgModule({
  imports: [
    CommonModule,
    RecepcionRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule

  ],
  declarations: [RecepcionComponent]
})
export class RecepcionModule { }
