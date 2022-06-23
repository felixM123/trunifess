import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchGuidesComponent } from './search-guides.component';

import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
@NgModule({
  declarations: [
    SearchGuidesComponent
  ],
  exports: [
    SearchGuidesComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    DataTablesModule
  ]
})
export class SearchGuidesModule { }
