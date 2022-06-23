import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IreceptionComponent } from './ireception.component';
import { InvoiceModule } from '../invoice.module';
import { NgxQRCodeModule } from 'ngx-qrcode3';

@NgModule({
  declarations: [
    IreceptionComponent
  ],
  exports:[
    IreceptionComponent
  ],
  imports: [
    CommonModule,
    InvoiceModule,
    NgxQRCodeModule
  ]
})
export class IreceptionModule { }
