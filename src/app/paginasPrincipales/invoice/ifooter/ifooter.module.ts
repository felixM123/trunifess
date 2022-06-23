import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfooterComponent } from './ifooter.component';

@NgModule({
  declarations: [IfooterComponent],
  exports:[
    IfooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IfooterModule { }
