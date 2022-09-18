import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../Models/orders';
import { environment } from 'src/environments/environment';
import { Observable, switchMap } from 'rxjs';
import { StripeService } from 'ngx-stripe';

const{ apiURL } = environment;

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private stripeService: StripeService) { }

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
