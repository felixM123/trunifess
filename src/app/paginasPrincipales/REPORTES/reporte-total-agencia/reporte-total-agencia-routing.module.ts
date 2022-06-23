import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteTotalAgenciaComponent} from './reporte-total-agencia.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteTotalAgenciaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteTotalAgenciaRoutingModule { }
