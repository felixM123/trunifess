import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprecionDesembarcoRoutingModule } from './imprecion-desembarco-routing.module';
import { ImprecionDesembarcoComponent } from './imprecion-desembarco.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ImprecionDesembarcoRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ImprecionDesembarcoComponent]
})
export class ImprecionDesembarcoModule { }
