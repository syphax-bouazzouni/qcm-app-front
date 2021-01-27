import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig
} from 'angularx-social-login';
import {environment} from '../../environments/environment';

const config =  {
  autoLogin: false,
  providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID)
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.FACE_BOOK_CLIENT_ID)
      }]
} as SocialAuthServiceConfig


export function getSocialAuthConfig(): SocialAuthServiceConfig{
  return config
}


