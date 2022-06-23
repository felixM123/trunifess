import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditPassComponent} from './edit-pass.component';

const routes: Routes = [
  {
    path: '',
    component: EditPassComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPassRoutingModule { }
