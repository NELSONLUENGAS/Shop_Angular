import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BrandResponse } from '../Interface/Category.interface';
import { brandModel, brandOneResponse, brandResponseBody } from '../Interface/Brand.interface';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${apiURL}/brand`);
  }
  getBrandById(id: string): Observable<brandOneResponse> {
    return this.http.get<brandOneResponse>(`${apiURL}/brand/${id}`);
  }
  postBrand(payload: brandModel ): Observable<brandResponseBody> {
    return this.http.post<brandResponseBody>(`${apiURL}/brand`, payload);
  }
  editBrand(id: string, payload: brandModel ): Observable<brandOneResponse> {
    return this.http.put<brandOneResponse>(`${apiURL}/brand/${id}`, payload);
  }
  enableBrand(id: string): Observable<brandOneResponse> {
    return this.http.put<brandOneResponse>(`${apiURL}/brand/enable/${id}`, null);
  }
  deleteBrand(id: string): Observable<brandOneResponse> {
    return this.http.delete<brandOneResponse>(`${apiURL}/brand/${id}`);
  }
}
