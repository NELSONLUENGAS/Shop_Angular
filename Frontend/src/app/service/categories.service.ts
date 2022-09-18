import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../Models/category';
import { environment } from 'src/environments/environment';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${apiURL}/category`);
  }
}
