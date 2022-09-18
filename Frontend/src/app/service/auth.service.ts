import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient,
    private router: Router,
    ) { }

  Login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${apiURL}/user/login`, {email, password});
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
