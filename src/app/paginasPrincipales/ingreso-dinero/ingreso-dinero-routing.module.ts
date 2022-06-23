import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {IngresoDineroComponent} from './ingreso-dinero.component';

const routes: Routes = [
  {
    path: '',
    component: IngresoDineroComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoDineroRoutingModule { }
