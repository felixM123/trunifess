import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamionesRoutingModule } from './camiones-routing.module';
import { CamionesComponent } from './camiones.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    CamionesRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [CamionesComponent]
})
export class CamionesModule { }
