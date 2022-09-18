import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { countries } from '../Models/countries';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<countries[]>{
    return this.http.get<countries[]>(`${apiURL}/countries`);
  }
}
