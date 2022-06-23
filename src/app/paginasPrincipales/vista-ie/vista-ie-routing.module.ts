import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaIEComponent } from './vista-ie.component';

const routes: Routes = [
  { path: '', component: VistaIEComponent, data: { title: 'vista I-E' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaIeRoutingModule { }
