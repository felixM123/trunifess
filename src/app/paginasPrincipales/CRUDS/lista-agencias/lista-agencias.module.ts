import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAgenciasRoutingModule } from './lista-agencias-routing.module';
import { ListaAgenciasComponent } from './lista-agencias.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ListaAgenciasRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ListaAgenciasComponent]
})
export class ListaAgenciasModule { }
