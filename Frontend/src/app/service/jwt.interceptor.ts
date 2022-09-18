import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

const { STRIPE_SECRET_KEY } = environment;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor( private LocalStorage: LocalStorageService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.LocalStorage.getItem('token');
    const APIUrl = request.url.startsWith(environment.apiURL);
    const checkoutSessionUrl = request.url.split('/') ;
    if(token && APIUrl && checkoutSessionUrl?.length !== 5){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}` 
        }
      })
    }else{
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${STRIPE_SECRET_KEY}` 
        }
      })
    }
    return next.handle(request);
  }
}
