import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SeguimientoGComponent} from './seguimiento-g.component';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoGComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoGRoutingModule { }
