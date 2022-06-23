import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprecionEmbarqueRoutingModule } from './imprecion-embarque-routing.module';
import { ImprecionEmbarqueComponent } from './imprecion-embarque.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ImprecionEmbarqueRoutingModule,
    SharedModule,
    NgbTypeaheadModule,
    DataTablesModule,
    FormsModule,
    PagesModule
  ],
  declarations: [ImprecionEmbarqueComponent]
})
export class ImprecionEmbarqueModule { }
