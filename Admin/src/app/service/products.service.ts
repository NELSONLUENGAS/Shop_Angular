import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { deleteProductResponse, postProductResponse, productResponse, Products } from '../models/products';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<productResponse>{
    return this.http.get<productResponse>(`${apiURL}/products`);
  }

  getProductById(id: string): Observable<deleteProductResponse> {
    return this.http.get<deleteProductResponse>(`${apiURL}/products/${id}`);
  }

  postProduct(payload: FormData): Observable<postProductResponse>  { 
    return this.http.post<postProductResponse>(`${apiURL}/products`,payload);
  }

  deleteProduct(id: string): Observable<deleteProductResponse> {
    return this.http.delete<deleteProductResponse>(`${apiURL}/products/${id}`);
  }
  
  editProduct(id: string, payload: FormData): Observable<deleteProductResponse> {
    return this.http.put<deleteProductResponse>(`${apiURL}/products/${id}`, payload);
  }

  enableProduct(id: string): Observable<deleteProductResponse> {
    return this.http.put<deleteProductResponse>(`${apiURL}/products/enable/${id}`, null);
  }
}