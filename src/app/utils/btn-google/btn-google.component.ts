import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SocialProviderType} from '../../interfaces/socialProviders';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-btn-google',
  templateUrl: './btn-google.component.html',
  styleUrls: ['./btn-google.component.scss']
})
export class BtnGoogleComponent implements OnInit {

  @Output()
  clicked = new EventEmitter<any>()
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClicked(): void{
    this.authService.socialService.signIn(SocialProviderType.Google)
    this.authService.socialService.authState.subscribe((result) => {
      this.authService.validateSocialToken(SocialProviderType.Google, result.authToken).subscribe((user) => {

        this.authService.saveToken(user.access_token , true)
      }, (errors) => {
        this.clicked.emit({success: false, errors: errors.errors})
      }, () => {
        this.clicked.emit({success: true})
      })
    })
  }
}
