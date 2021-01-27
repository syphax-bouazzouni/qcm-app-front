import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {DashbordComponent} from './dashbord/dashbord.component';
import {SecureComponent} from './secure.component';
import {VerifyComponent} from './verify/verify.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {UtilsModule} from '../utils/utils.module';
import { RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { ModulesComponent } from './modules/modules.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { QuizFiltersComponent } from './quiz/quiz-filters/quiz-filters.component';
import { QuizAppComponent } from './quiz/quiz-app/quiz-app.component';
import { HeaderComponent } from './header/header.component';
import { QuizInstrcutionsComponent } from './quiz/quiz-instrcutions/quiz-instrcutions.component';
import { QuizMainComponent } from './quiz/quiz-main/quiz-main.component';
import { QuizSideComponent } from './quiz/quiz-side/quiz-side.component';
import {NgxTimerModule} from 'ngx-timer';
import { QuizTimerComponent } from './quiz/quiz-timer/quiz-timer.component';
import { QuizTestComponent } from './quiz/quiz-test/quiz-test.component';
import { QuizPropositionComponent } from './quiz/quiz-propostion/quiz-proposition.component';
import { QuizResultComponent } from './quiz/quiz-result/quiz-result.component';


@NgModule({
  declarations: [
    SecureComponent,
    DashbordComponent,
    VerifyComponent,
    ModulesComponent,
    QuizComponent,
    QuizListComponent,
    QuizFiltersComponent,
    QuizAppComponent,
    HeaderComponent,
    QuizInstrcutionsComponent,
    QuizMainComponent,
    QuizSideComponent,
    QuizTimerComponent,
    QuizTestComponent,
    QuizPropositionComponent,
    QuizResultComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UtilsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxTimerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    SecureComponent, QuizComponent
  ]
})
export class SecureModule { }
