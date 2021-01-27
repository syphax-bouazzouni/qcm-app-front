import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {Observable, throwError} from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  errors = null;
  completed = false;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService){

    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: ['']
    })

    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls.passwordToken.setValue(params.token);
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): void{
    this.authService.updatePassword(this.changePasswordForm.value).subscribe(
      result => {
        this.changePasswordForm.reset();
      },
      error => {
        this.errors = error.error
        this.handleError(error);
      },
      () => {
        this.completed = true
    }
    );
  }

  handleError(error: any): Observable<never>{
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  goToLogin(): void {
    this.router.navigate(['login'])
  }
}
