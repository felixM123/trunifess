import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DesembarcoComponent} from './desembarco.component';

const routes: Routes = [
  {
    path: '',
    component: DesembarcoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesembarcoRoutingModule { }
