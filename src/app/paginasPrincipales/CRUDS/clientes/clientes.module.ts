import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ClientesComponent]
})
export class ClientesModule { }
