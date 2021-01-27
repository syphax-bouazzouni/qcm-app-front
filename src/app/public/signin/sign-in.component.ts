import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent  {
  loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    })
  }



  onSubmit(): void {

    this.authService.signIn(this.loginForm.value).subscribe(
      result => {
        this.authService.saveToken(result.access_token)
      },
      error => {
        this.errors = error.error;
        if (error.error && error.error.unverified) {
          this.router.navigate(['/verify'])
        }
      }, () => {
        this.authService.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['/app']);
      }
    );
  }
  connected( event: any ): void {
    if (event.success){
      console.log('social login success')
      this.router.navigate(['app'])
    }else {
      console.log(event.errors)
    }
  }

}
