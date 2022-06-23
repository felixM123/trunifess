import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoferesRoutingModule } from './choferes-routing.module';
import { ChoferesComponent } from './choferes.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { PagesModule } from '../../pages.module';
@NgModule({
  imports: [
    CommonModule,
    ChoferesRoutingModule,
    SharedModule,
    DataTablesModule,
    PagesModule,

  ],
  declarations: [ChoferesComponent]
})
export class ChoferesModule { }
