import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {SocialProviderType} from '../../interfaces/socialProviders';

@Component({
  selector: 'app-btn-facebook',
  templateUrl: './btn-facebook.component.html',
  styleUrls: ['./btn-facebook.component.scss']
})
export class BtnFacebookComponent implements OnInit {

  @Output()
  clicked = new EventEmitter<any>()

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onClicked(): void{
      this.authService.socialService.signIn(SocialProviderType.Facebook)
      this.authService.socialService.authState.subscribe((result) => {
          this.authService.validateSocialToken(SocialProviderType.Facebook, result.authToken).subscribe((user) => {
              console.log(user.access_token)
              this.authService.saveToken(user.access_token, true)
          }, (errors) => {
            this.clicked.emit({success: false, errors: errors.errors})
          }, () => {
            this.clicked.emit({success: true})
          })
      })
  }
}
