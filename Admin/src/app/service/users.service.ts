import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { enableUser, getUsersResponse } from '../models/users';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { }

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
}
