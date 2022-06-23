import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCamionesRoutingModule } from './lista-camiones-routing.module';
import { ListaCamionesComponent } from './lista-camiones.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ListaCamionesRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ListaCamionesComponent]
})
export class ListaCamionesModule { }
