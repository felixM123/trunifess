import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [UsuariosComponent]
})
export class UsuariosModule { }
