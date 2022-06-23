import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnularEntregaComponent} from './anular-entrega.component';

const routes: Routes = [
  {
    path: '',
    component: AnularEntregaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnularEntregaRoutingModule { }
