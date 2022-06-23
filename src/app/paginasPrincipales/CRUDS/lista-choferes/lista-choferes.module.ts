import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaChoferesRoutingModule } from './lista-choferes-routing.module';
import { ListaChoferesComponent } from './lista-choferes.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ListaChoferesRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ListaChoferesComponent]
})
export class ListaChoferesModule { }
