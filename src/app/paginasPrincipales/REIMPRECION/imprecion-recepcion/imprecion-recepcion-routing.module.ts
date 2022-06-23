import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImprecionRecepcionComponent} from './imprecion-recepcion.component';

const routes: Routes = [
  {
    path: '',
    component: ImprecionRecepcionComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprecionRecepcionRoutingModule { }
