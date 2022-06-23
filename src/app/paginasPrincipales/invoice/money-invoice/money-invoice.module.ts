import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyInvoiceComponent } from './money-invoice.component';
import { InvoiceModule } from '../invoice.module';
@NgModule({
  declarations: [
    MoneyInvoiceComponent
  ],
  exports: [
    MoneyInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class MoneyInvoiceModule { }
