import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChoferesComponent} from './choferes.component';

const routes: Routes = [
  {
    path: '',
    component: ChoferesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferesRoutingModule { }
