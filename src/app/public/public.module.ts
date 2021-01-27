import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './signin/sign-in.component';
import {SignUpComponent} from './signup/sign-up.component';
import { PublicComponent } from './public.component';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserModule, Title} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {UtilsModule} from '../utils/utils.module';
import {RouterModule} from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';



@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    PublicComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    UtilsModule,
    RouterModule,
    AppRoutingModule
  ],
  exports: [
    PublicComponent
  ]
})
export class PublicModule { }
