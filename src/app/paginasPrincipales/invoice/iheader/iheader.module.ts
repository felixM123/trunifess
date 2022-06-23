import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IheaderComponent } from './iheader.component';

@NgModule({
  declarations: [
    IheaderComponent
  ], 
  exports: [
    IheaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IheaderModule { }
