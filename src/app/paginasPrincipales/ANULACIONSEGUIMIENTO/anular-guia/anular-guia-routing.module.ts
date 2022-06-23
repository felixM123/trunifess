import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnularGuiaComponent} from './anular-guia.component';

const routes: Routes = [
  {
    path: '',
    component: AnularGuiaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnularGuiaRoutingModule { }
