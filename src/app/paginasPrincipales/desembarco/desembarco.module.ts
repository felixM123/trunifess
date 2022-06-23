import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesembarcoRoutingModule } from './desembarco-routing.module';
import { DesembarcoComponent } from './desembarco.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { PagesModule } from '../pages.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    DesembarcoRoutingModule,
    SharedModule,
    PagesModule,
    DataTablesModule
  ],
  declarations: [DesembarcoComponent]
})
export class DesembarcoModule { }
