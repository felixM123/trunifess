import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IheaderModule } from './iheader/iheader.module';
import { IfooterModule } from './ifooter/ifooter.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IheaderModule,
    IfooterModule,

  ],
  exports:[
    IheaderModule,
    IfooterModule
  ]
})
export class InvoiceModule { }
