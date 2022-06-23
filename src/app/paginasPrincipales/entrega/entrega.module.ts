import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregaRoutingModule } from './entrega-routing.module';
import { EntregaComponent } from './entrega.component';
import {SharedModule} from '../../theme/shared/shared.module';
import { PagesModule } from '../pages.module';
@NgModule({
  imports: [
    CommonModule,
    EntregaRoutingModule,
    SharedModule,
    PagesModule
  ],
  declarations: [EntregaComponent]
})
export class EntregaModule { }
