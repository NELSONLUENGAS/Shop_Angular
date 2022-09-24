import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countries } from '../interface/Countries.interface';
import { environment } from '../environments/environment';

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
