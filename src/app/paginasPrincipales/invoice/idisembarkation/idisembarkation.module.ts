import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdisembarkationComponent } from './idisembarkation.component';
import { InvoiceModule } from '../invoice.module';

@NgModule({
  declarations: [
    IdisembarkationComponent
  ],
  exports:[
    IdisembarkationComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule
  ]
})
export class IdisembarkationModule { }
