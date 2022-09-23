import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../../../apps/shop/src/environments/environment';

const { apiURL, STRIPE_SECRET_KEY } = environment;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private LocalStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.LocalStorage.getItem('token');
    const APIUrl = request.url.startsWith(apiURL);
    const url = request.url.split('/') ;
    if(url.includes('create-session-checkout')){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${STRIPE_SECRET_KEY}` 
        }
      })
    }else if(token && APIUrl ){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}` 
        }
      })
    }
    return next.handle(request);
  }
}
