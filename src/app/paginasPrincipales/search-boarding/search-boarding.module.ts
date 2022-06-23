import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoardingComponent } from './search-boarding.component';
import {DataTablesModule} from 'angular-datatables';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchBoardingComponent
  ],
  exports:[
    SearchBoardingComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    DataTablesModule
  ]
})
export class SearchBoardingModule { }
