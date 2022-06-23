import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClienteRoutingModule } from './lista-cliente-routing.module';
import { ListaClienteComponent } from './lista-cliente.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ListaClienteRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ListaClienteComponent]
})
export class ListaClienteModule { }
