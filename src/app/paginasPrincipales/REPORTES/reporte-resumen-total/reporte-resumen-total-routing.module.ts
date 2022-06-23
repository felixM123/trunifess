import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteResumenTotalComponent} from './reporte-resumen-total.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteResumenTotalComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteResumenTotalRoutingModule { }
