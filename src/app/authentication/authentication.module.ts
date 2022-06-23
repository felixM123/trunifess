import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import * as $ from 'jquery';
import { AuthSigninModule } from './auth-signin/auth-signin.module';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

    AuthSigninModule,

    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthenticationModule { }
