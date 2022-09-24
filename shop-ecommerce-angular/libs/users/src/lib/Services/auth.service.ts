import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalStorageService } from './local-storage.service';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient,
    private router: Router,
    private LocalStorage: LocalStorageService
    ) { }

  Login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${apiURL}/user/login`, {email, password});
  }

  Logout(){
    this.LocalStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
