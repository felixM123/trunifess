import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { IreceptionModule } from './invoice/ireception/ireception.module';
import { IdisembarkationModule } from './invoice/idisembarkation/idisembarkation.module';
import { IshippingOrderModule } from './invoice/ishipping-order/ishipping-order.module';
import { IdeliveryModule } from './invoice/idelivery/idelivery.module';
import { SearchRecepcionModule } from './search-recepcion/search-recepcion.module';
import { SearchBoardingModule } from './search-boarding/search-boarding.module';

import { NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { MoneyInvoiceModule } from './invoice/money-invoice/money-invoice.module';
import 'hammerjs';

import {IreimprimirReceptionModule} from './invoice/ireimprimir-reception/ireimprimir-reception.module';

import{ IremoneyModule } from './invoice/iremoney/iremoney.module';
import { RegisterEntryComponent } from './register-entry/register-entry.component';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { ArregloIngresosComponent } from './arreglo-ingresos/arreglo-ingresos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import{SearchGuidesModule} from './search-guides/search-guides.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IreceptionModule,
    IdisembarkationModule,
    IshippingOrderModule,
    IdeliveryModule,
    IremoneyModule,
    IreimprimirReceptionModule,
    MoneyInvoiceModule,
    SearchRecepcionModule,
    NgbDatepickerModule,
    NgbModule,
    NgbTypeaheadModule,
    SearchBoardingModule,
    SearchGuidesModule,

  ],
  exports: [
    SearchRecepcionModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    IreceptionModule,
    IdisembarkationModule,
    IshippingOrderModule,
    IremoneyModule,
    IdeliveryModule,
    IreimprimirReceptionModule,
    SearchBoardingModule,
    NgbDatepickerModule,
    MoneyInvoiceModule,
    SearchGuidesModule,
    NgbTypeaheadModule,


  ],
  declarations: [
    ArregloIngresosComponent,
    RegisterEntryComponent,








  ],
  entryComponents: [
    RegisterEntryComponent
  ]
})
export class PagesModule { }
