import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { deleteProductResponse, productResponse } from '../Models/products';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(filterSelected?: string): Observable<productResponse>{
    if(filterSelected)return this.http.get<productResponse>(`${apiURL}/products?categories=${filterSelected}`);
    return this.http.get<productResponse>(`${apiURL}/products`);
  }

  getProductById(id: string): Observable<deleteProductResponse>{
    return this.http.get<deleteProductResponse>(`${apiURL}/products/${id}`);
  }

}
