import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgenciasRoutingModule } from './agencias-routing.module';
import { AgenciasComponent } from './agencias.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    AgenciasRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [AgenciasComponent]
})
export class AgenciasModule { }
