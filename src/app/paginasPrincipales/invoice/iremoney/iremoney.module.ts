import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IremoneyComponent } from './iremoney.component';

import { InvoiceModule } from '../invoice.module';
@NgModule({
  declarations: [
    IremoneyComponent
  ],
  exports: [
    IremoneyComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class IremoneyModule { }
