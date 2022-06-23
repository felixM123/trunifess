import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {EgresoDineroComponent} from './egreso-dinero.component';

const routes: Routes = [
  {
    path: '',
    component: EgresoDineroComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresoDineroRoutingModule { }
