import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesResponse, CategoryResponse, PostCategory, PostCategoryResponse } from 'src/app/models/category';

const { apiURL } = environment; 

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { 
    
  }
  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${apiURL}/category`);
  }

  getCategoryById(id: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${apiURL}/category/${id}`);
  }

  postCategory(payload: PostCategory): Observable<PostCategoryResponse>  {
    return this.http.post<PostCategoryResponse>(`${apiURL}/category`,payload);
  }

  deleteCategory(id: string): Observable<CategoryResponse> {
    return this.http.delete<CategoryResponse>(`${apiURL}/category/${id}`);
  }
  
  editCategory(id: string, payload: PostCategory): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${apiURL}/category/${id}`, payload);
  }

  enableCategory(id: string): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${apiURL}/category/enable/${id}`, null);
  }
  
}
