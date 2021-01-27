import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './public/signin/sign-in.component';
import {HomeComponent} from './public/home/home.component';
import {SignUpComponent} from './public/signup/sign-up.component';
import {VerifyComponent} from './secure/verify/verify.component';
import {SecureComponent} from './secure/secure.component';
import {DashbordComponent} from './secure/dashbord/dashbord.component';
import {LoginActivateGuard} from './shared/login-activate.guard';
import {PublicComponent} from './public/public.component';
import {ResetPasswordComponent} from './public/reset-password/reset-password.component';
import {UpdatePasswordComponent} from './public/update-password/update-password.component';
import {ModulesComponent} from './secure/modules/modules.component';
import {QuizListComponent} from './secure/quiz-list/quiz-list.component';
import {QuizComponent} from './secure/quiz/quiz.component';
import {QuizFiltersComponent} from './secure/quiz/quiz-filters/quiz-filters.component';
import {QuizAppComponent} from './secure/quiz/quiz-app/quiz-app.component';
import {QuizResultComponent} from './secure/quiz/quiz-result/quiz-result.component';

const routes: Routes = [
  { path: '', component: PublicComponent , children: [
      {path: '' , component: HomeComponent , data: { title: 'Application QCM'}},
      { path: 'login', component: SignInComponent , data: { title: 'Se connecter'} },
      { path: 'register', component: SignUpComponent , data: { title: 'Inscription'}},
      { path: 'password-reset', component: ResetPasswordComponent , data: { title: 'Demande de réinitialisation du mot de passe'}},
      { path: 'update-password', component: UpdatePasswordComponent , data: { title: 'Mise a jour du mot de passe'}},
      { path: 'verify', component: VerifyComponent , data: { title: 'Confirmer votre email'}}
    ]
  },
  { path: 'app' , component: SecureComponent , canActivate: [LoginActivateGuard], children: [
      {path: 'dashboard' , component: DashbordComponent , data: { title: 'Tabelau de bord'}},
      {path: '' , component: DashbordComponent , data: { title: 'Tabelau de bord'}},
      {path: 'modules' , component: ModulesComponent , data: { title: 'Les modules'}},
      {path: 'modules/:id' , component: QuizListComponent },
    ]},
  { path: 'quiz' , component: QuizComponent , canActivate: [LoginActivateGuard], children: [
      {path: 'filters' , component: QuizFiltersComponent , data: { title: 'Tabelau de bord'}},
      {path: '' , component: QuizFiltersComponent , data: { title: 'Tabelau de bord'}},
      {path: 'test' , component: QuizAppComponent , data: { title: 'Tabelau de bord'}},
      {path: 'result' , component: QuizResultComponent , data: { title: 'Les modules'}},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
