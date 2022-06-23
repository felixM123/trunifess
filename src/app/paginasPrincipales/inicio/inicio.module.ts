import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import {SharedModule} from '../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }
