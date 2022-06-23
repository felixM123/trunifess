import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImprecionDesembarcoComponent} from './imprecion-desembarco.component';

const routes: Routes = [
  {
    path: '',
    component: ImprecionDesembarcoComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprecionDesembarcoRoutingModule { }
