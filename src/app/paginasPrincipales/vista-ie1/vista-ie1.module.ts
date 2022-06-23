import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaIE1Component } from './vista-ie1.component';
import { VistaIe1RoutingModule } from './vista-ie1-routing.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module'
import {SharedModule} from '../../theme/shared/shared.module';
@NgModule({
  declarations: [VistaIE1Component],
  imports: [
    CommonModule,
    VistaIe1RoutingModule,
    NgbDatepickerModule,
    FormsModule,
    PagesModule,
    SharedModule
  ]
})
export class VistaIE1Module { }
