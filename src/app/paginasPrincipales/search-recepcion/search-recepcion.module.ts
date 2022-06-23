import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRecepcionComponent } from './search-recepcion.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
@NgModule({
  declarations: [SearchRecepcionComponent],

  exports:[
    SearchRecepcionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDatepickerModule,
    DataTablesModule
  ]
})
export class SearchRecepcionModule { }
