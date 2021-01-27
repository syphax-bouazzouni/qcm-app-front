import { Injectable } from '@angular/core'
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import { TokenService } from './token.service'
import {Observable} from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getToken()
    console.log('set token to header' + accessToken)
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return next.handle(req);
  }
}
