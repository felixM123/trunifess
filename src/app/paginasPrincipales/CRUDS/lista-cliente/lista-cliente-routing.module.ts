import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListaClienteComponent} from './lista-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ListaClienteComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaClienteRoutingModule { }
