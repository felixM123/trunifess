import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteTransaccionEntregaComponent} from './reporte-transaccion-entrega.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteTransaccionEntregaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteTransaccionEntregaRoutingModule { }
