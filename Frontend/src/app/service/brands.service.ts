import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponse } from '../Models/category';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(`${apiURL}/brand`);
  }
}
