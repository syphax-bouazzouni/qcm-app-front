import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {PublicModule} from './public/public.module';
import {SecureModule} from './secure/secure.module';
import {SocialLoginModule} from 'angularx-social-login';
import {getSocialAuthConfig} from './shared/social-login-confing.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemListComponent } from './utils/menu-item-list/menu-item-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { ModuleCardComponent } from './utils/module-card/module-card.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PublicModule,
    SecureModule,
    AppRoutingModule,
    SocialLoginModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: getSocialAuthConfig()
    },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
