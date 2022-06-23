import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImprecionEntregaComponent} from './imprecion-entrega.component';

const routes: Routes = [
  {
    path: '',
    component: ImprecionEntregaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprecionEntregaRoutingModule { }
