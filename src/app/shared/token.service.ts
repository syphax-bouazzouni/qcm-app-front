import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login: environment.backendApiUrl + 'api/auth/login',
    register: environment.backendApiUrl + 'api/auth/register',
    facebook: environment.backendApiUrl + 'api/auth/social/facebook',
    google: environment.backendApiUrl + 'api/auth/social/google',
  }
  private storage: Storage = localStorage
  private readonly AUTH_KEY = 'auth_token'
  private readonly AUTH_SOCIAL_KEY = 'auth_social_token'
  constructor() {}

  setStorage(storage: Storage): void{
    this.storage = storage
  }

  setToken(token: string, social?: boolean): void{
    //console.log('token set to : ' + token)
    this.storage.setItem(this.AUTH_KEY, token)
    if (social){
      //console.log(' social token ')
      this.storage.setItem(this.AUTH_SOCIAL_KEY, 'true')
    }
  }

  getToken(): string | null{
    return this.storage.getItem(this.AUTH_KEY)
  }

  isSocialToken(): boolean{
    return this.storage.getItem(this.AUTH_SOCIAL_KEY) != null
  }
  // Remove token
  removeToken(): void{
    this.storage.removeItem(this.AUTH_KEY);
  }

  // Verify the token
  isValidToken(): boolean{
    const token = this.getToken()

    if (token){
      const payload = this.payload(token);
      if (payload){
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }

  payload( token: string ): any{
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }





}
