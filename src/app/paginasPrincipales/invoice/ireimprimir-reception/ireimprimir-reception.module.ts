import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IreimprimirReceptionComponent } from './ireimprimir-reception.component';

import { InvoiceModule } from '../invoice.module';
@NgModule({
  declarations: [IreimprimirReceptionComponent],
  exports:[
    IreimprimirReceptionComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class IreimprimirReceptionModule { }
