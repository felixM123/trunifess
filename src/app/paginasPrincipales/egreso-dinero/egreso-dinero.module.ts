import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgresoDineroRoutingModule } from './egreso-dinero-routing.module';
import { EgresoDineroComponent } from './egreso-dinero.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { PagesModule } from '../pages.module';
import {DataTablesModule} from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    EgresoDineroRoutingModule,
    SharedModule,
    PagesModule,
    DataTablesModule
  ],
  declarations: [EgresoDineroComponent]
})
export class EgresoDineroModule { }
