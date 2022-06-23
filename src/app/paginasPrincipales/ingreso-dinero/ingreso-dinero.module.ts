import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoDineroRoutingModule } from './ingreso-dinero-routing.module';
import { IngresoDineroComponent } from './ingreso-dinero.component';
import {SharedModule} from '../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../pages.module';
@NgModule({
  imports: [
    CommonModule,
    IngresoDineroRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [IngresoDineroComponent]
})
export class IngresoDineroModule { }
