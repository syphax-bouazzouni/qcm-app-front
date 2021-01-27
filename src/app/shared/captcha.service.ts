import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private http: HttpClient) { }

  validateCaptchaToken(token: string): Observable<any>{
    return this.http.post(environment.backendApiUrl + 'api/auth/captcha', {captcha : token})
  }
}
