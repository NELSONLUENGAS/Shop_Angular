import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enableUser, getUsersResponse, User } from '../interface/users.interface';
import { environment } from '../../../../../apps/shop/src/environments/environment';
import { UsersFacade } from '../state/users.facade';
import { Router } from '@angular/router';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private usersFacade: UsersFacade, private router: Router,) { }

  getUsers(): Observable<getUsersResponse>{
    return this.http.get<getUsersResponse>(`${apiURL}/user`);
  }

  enableUser(id: string): Observable<enableUser>{
    return this.http.put<enableUser>(`${apiURL}/user/enable/${id}`, null);
  }

  updateUserRol(id: string, payload: string[] | string): Observable<enableUser>{
    return this.http.put<enableUser>(`${apiURL}/rol/enable/${id}`, payload);
  }

  deleteUser(id: string): Observable<enableUser>{
    return this.http.delete<enableUser>(`${apiURL}/user/${id}`);
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
