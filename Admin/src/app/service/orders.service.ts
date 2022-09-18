import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${apiURL}/orders`);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${apiURL}/orders/${id}`, status);
  }
  deleteOrder(id: string): Observable<any> {
    return this.http.get<any>(`${apiURL}/orders/${id}`);
  }
}
