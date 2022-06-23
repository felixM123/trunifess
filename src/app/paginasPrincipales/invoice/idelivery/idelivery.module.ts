import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeliveryComponent } from './idelivery.component';
import { InvoiceModule } from '../invoice.module';

@NgModule({
  declarations: [
    IdeliveryComponent
  ],
  exports:[
    IdeliveryComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class IdeliveryModule { }
