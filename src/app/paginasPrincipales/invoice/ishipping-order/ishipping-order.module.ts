import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IshippingOrderComponent } from './ishipping-order.component';
import { InvoiceModule } from '../invoice.module';

@NgModule({
  declarations: [
    IshippingOrderComponent
  ],
  exports:[
    IshippingOrderComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class IshippingOrderModule { }
