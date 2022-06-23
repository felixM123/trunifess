import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteResumenDetalleComponent} from './reporte-resumen-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteResumenDetalleComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteResumenDetalleRoutingModule { }
