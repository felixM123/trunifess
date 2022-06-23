import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListaChoferesComponent} from './lista-choferes.component';

const routes: Routes = [
  {
    path: '',
    component: ListaChoferesComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaChoferesRoutingModule { }
