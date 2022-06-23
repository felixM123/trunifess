import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CamionesComponent} from './camiones.component';

const routes: Routes = [
  {
    path: '',
    component: CamionesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamionesRoutingModule { }
