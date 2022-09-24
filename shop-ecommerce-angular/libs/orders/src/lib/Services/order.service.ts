import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { Order, OrderItem } from '../interface/Orders.interface';
import { StripeService } from 'ngx-stripe';

const { apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private stripeService: StripeService) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${apiURL}/orders`);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${apiURL}/orders/${id}`, status);
  }
  deleteOrder(id: string): Observable<any> {
    return this.http.get<any>(`${apiURL}/orders/${id}`);
  }

  creteOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(`${apiURL}/orders`, order);
  }
  createCheckoutSession(orderItems: OrderItem[]): Observable<any>{
    return this.http.post<any>(`${apiURL}/orders/create-session-checkout`, orderItems)
      .pipe(
        switchMap( session => {
          return this.stripeService.redirectToCheckout({sessionId: session.id})
        } )
      )
  }

  cacheOrderData(order: Order){
    return localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCacheOrderData(){
    const orderJson: string | null = localStorage.getItem('orderData');
    return typeof orderJson === 'string' ? JSON.parse(orderJson) : null;
  }

  removeCacheOrderData(){
    return localStorage.removeItem('orderData');
  }
}
