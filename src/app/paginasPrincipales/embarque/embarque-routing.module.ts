import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {EmbarqueComponent} from './embarque.component';

const routes: Routes = [
  {
    path: '',
    component: EmbarqueComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbarqueRoutingModule { }
