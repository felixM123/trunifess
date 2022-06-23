import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImprecionEmbarqueComponent} from './imprecion-embarque.component';

const routes: Routes = [
  {
    path: '',
    component: ImprecionEmbarqueComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprecionEmbarqueRoutingModule { }
