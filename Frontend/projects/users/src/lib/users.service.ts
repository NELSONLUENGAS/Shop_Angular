import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsersFacade } from './state/users.facade';
import { User } from 'src/app/Models/users';
const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( 
    private http: HttpClient,
    private router: Router,
    private usersFacade: UsersFacade,
    ) { }

  Login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${apiURL}/user/login`, {email, password});
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  initAppSession(){
    this.usersFacade.buildUsersSession();
  }

  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`${apiURL}/user/${id}`);
  }

  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }
}
