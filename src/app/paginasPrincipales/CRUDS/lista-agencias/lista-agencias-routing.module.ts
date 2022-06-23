import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListaAgenciasComponent} from './lista-agencias.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAgenciasComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaAgenciasRoutingModule { }
