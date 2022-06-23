import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprecionRecepcionRoutingModule } from './imprecion-recepcion-routing.module';
import { ImprecionRecepcionComponent } from './imprecion-recepcion.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ImprecionRecepcionRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ImprecionRecepcionComponent]
})
export class ImprecionRecepcionModule { }
