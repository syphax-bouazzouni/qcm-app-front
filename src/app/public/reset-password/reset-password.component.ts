import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  errors = null;
  successMsg = null;
  isSubmited = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void { }

  onSubmit(): void{
    this.authService.sendResetPasswordLink(this.resetForm.value).subscribe(
      (result) => {
        this.successMsg = result;
      }, (error) => {
        this.errors = error.error.message;
      }, () => {
        this.isSubmited = true
      })
  }

}
