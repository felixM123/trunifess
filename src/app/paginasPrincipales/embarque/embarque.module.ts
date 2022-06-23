import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbarqueRoutingModule } from './embarque-routing.module';
import { EmbarqueComponent } from './embarque.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { PagesModule } from '../pages.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    EmbarqueRoutingModule,
    SharedModule,
    PagesModule,
    DataTablesModule,

  ],
  declarations: [EmbarqueComponent]
})
export class EmbarqueModule { }
