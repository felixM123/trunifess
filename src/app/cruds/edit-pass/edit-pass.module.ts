import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPassRoutingModule } from './edit-pass-routing.module';
import { EditPassComponent } from './edit-pass.component';
import {SharedModule} from '../../theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EditPassRoutingModule,
    SharedModule
  ],
  declarations: [EditPassComponent]
})
export class EditPassModule { }
