import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaIE1Component } from './vista-ie1.component';

const routes: Routes = [
  { path: '', component: VistaIE1Component, data: { title: 'vista I-E' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaIe1RoutingModule { }
