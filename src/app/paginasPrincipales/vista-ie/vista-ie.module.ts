import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaIEComponent } from './vista-ie.component';
import { VistaIeRoutingModule } from './vista-ie-routing.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PagesModule } from '../pages.module'
import {SharedModule} from '../../theme/shared/shared.module';
@NgModule({
  declarations: [VistaIEComponent],
  imports: [
    CommonModule,
    VistaIeRoutingModule,
    NgbDatepickerModule,
    FormsModule,
    PagesModule,
    SharedModule
  ]
})
export class VistaIEModule { }
