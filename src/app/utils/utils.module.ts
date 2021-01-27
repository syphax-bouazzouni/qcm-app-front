import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BtnFacebookComponent} from './btn-facebook/btn-facebook.component';
import {BtnGoogleComponent} from './btn-google/btn-google.component';
import {BtnPrimaryComponent} from './btn-primary/btn-primary.component';
import {LogoComponent} from './logo/logo.component';
import {FormFieldComponent} from './form-field/form-field.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MenuItemListComponent} from './menu-item-list/menu-item-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {AppRoutingModule} from '../app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {ModuleCardComponent} from './module-card/module-card.component';
import {PathComponent} from './path/path.component';
import { BtnRadiusComponent } from './btn-radius/btn-radius.component';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';

const components = [
  BtnFacebookComponent,
  BtnGoogleComponent,
  BtnPrimaryComponent,
  LogoComponent,
  FormFieldComponent,
  MenuItemComponent,
  MenuItemListComponent,
  ModuleCardComponent,
  PathComponent,
  BtnRadiusComponent,
  ProgressCircleComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    AppRoutingModule,
    MatCardModule,
  ],
  exports: [
    components,
  ]
})
export class UtilsModule { }
