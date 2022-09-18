import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { brandModel, brandOneResponse, brandResponseBody } from '../models/brand';
import { BrandResponse } from '../models/category';
import { environment } from '../../../../environments/environment';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

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
