import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteTransaccionComponent} from './reporte-transaccion.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteTransaccionComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteTransaccionRoutingModule { }
