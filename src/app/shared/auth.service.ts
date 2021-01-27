import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';
import {SocialAuthService} from 'angularx-social-login';
import {SocialProviderType} from '../interfaces/socialProviders';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState = new BehaviorSubject<boolean>(this.token.isValidToken());
  userAuthState = this.userState.asObservable();
  private isSocialConnected = false;

  constructor(private http: HttpClient,
              public token: TokenService,
              public socialService: SocialAuthService) {
  }
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(environment.backendApiUrl + 'api/auth/register', user)
  }

  // Login
  signIn(user: User): Observable<any> {
    return this.http.post<any>(environment.backendApiUrl + 'api/auth/login', user)
  }

  // Social Login/Register
  public validateSocialToken(provider: SocialProviderType , token: string): Observable<any> {
    return this.http.get<any>(environment.backendApiUrl + 'api/auth/social/' + provider.toLowerCase()
       + '?token=' + token)
  }

  // Access user profile
  getUser(): Observable<any> {
    return this.http.get(environment.backendApiUrl + 'api/auth/user')
  }

  sendResetPasswordLink(email: string): Observable<any>{
    return this.http.post(environment.backendApiUrl + 'api/auth/reset-password', email)
  }

  updatePassword(data: any ): Observable<any> {
    return this.http.post(environment.backendApiUrl + 'api/auth/update-password', data)
  }

  setAuthState(value: boolean): void {
    this.userState.next(value);
  }

  isLoggedIn(): boolean{
    return this.token.isValidToken()
  }

  saveToken( accessToken: string , social?: boolean): void{
    this.token.setToken(accessToken , social);
  }

  signOut(): void {
    this.setAuthState(false);
    this.token.removeToken();
  }



}
