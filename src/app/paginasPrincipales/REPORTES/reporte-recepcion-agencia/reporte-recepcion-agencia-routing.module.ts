import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReporteRecepcionAgenciaComponent} from './reporte-recepcion-agencia.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteRecepcionAgenciaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRecepcionAgenciaRoutingModule { }
