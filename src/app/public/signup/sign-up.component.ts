import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {environment} from '../../../environments/environment';
import {CaptchaService} from '../../shared/captcha.service';
import {SocialProviderType} from '../../interfaces/socialProviders';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup = {} as FormGroup
  private errors = {}
  captchakey = environment.SITE_KEY
  captchaValidated = false

  constructor(  public router: Router,
                public fb: FormBuilder,
                public authService: AuthService,
                public captchaService: CaptchaService,
                ) {
    this.registerForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      captcha: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.captchaValidated){
      this.errors = {captacha : 'not validated'}
      return
    }

    this.authService.register(this.registerForm.value).subscribe(
      result => {
        console.log('result ' + result)
      },
      error => {
        this.errors = error.error
        console.log('errors:' + error.error)
      },
      () => {
        this.registerForm.reset()
        this.router.navigate(['verify']);
      }
    )
  }

  resolved(captchaResponse: string): void {
    this.captchaService.validateCaptchaToken(captchaResponse).subscribe(
      data => {
        this.captchaValidated = true
      },
      err => {
        console.log(err)
      })
  }
  getErrors(): string{
    return JSON.stringify(this.errors)
  }
  hasErrors(): boolean{
    return this.getErrors() !== '{}'
  }

  connected( event: any ): void {
    if (event.success){
      this.router.navigate(['/app'])
    }else {
      console.log(event.errors)
    }
  }
}
