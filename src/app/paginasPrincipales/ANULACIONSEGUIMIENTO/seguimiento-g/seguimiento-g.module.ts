import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguimientoGRoutingModule } from './seguimiento-g-routing.module';
import { SeguimientoGComponent } from './seguimiento-g.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    SeguimientoGRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [SeguimientoGComponent]
})
export class SeguimientoGModule { }
