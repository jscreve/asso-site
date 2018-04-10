import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';
const API_URL = environment.apiUrl;

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private _injector: Injector, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const _authService = this._injector.get(AuthService);
    const re: RegExp = new RegExp(API_URL, 'i');
    if (re.test(req.url)) { // api call
      let authReq = req;
      if (_authService.getToken() != null) {
        authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + _authService.getToken())});
      }
      return next.handle(authReq).do(
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home']);
            }
          }
        }
      );
    } else {
      return next.handle(req);
    }
  }
}
