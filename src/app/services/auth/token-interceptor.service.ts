import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private _injector: Injector) { }

  intercept(req: any, next: any) {
    let authService = this._injector.get(AuthService);

    let tokenReq = req.clone({
      setHeaders: {
        Accept: '*/*',
        Cache_Control: 'no-cache',
        Content_Type: 'application/json',
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenReq)
  }
}
