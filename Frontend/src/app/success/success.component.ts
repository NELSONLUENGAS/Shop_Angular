import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../Models/orders';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { OrdersService } from '../service/orders.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  orderItems: OrderItem[] = [];
  order: Order;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.toPlaceOrder();
  }
  private toPlaceOrder(){
    this.order = this.ordersService.getCacheOrderData()
    if(this.order){
      this.ordersService.creteOrder(this.order).subscribe( () => {
        this.placeOrderSuccess();
        this.cartService.emptyCart();
        this.ordersService.removeCacheOrderData();
        timer(2000).subscribe(() => this.router.navigateByUrl('/'))
      })
    }
  }

  placeOrderSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Place order Successfuly'});
  }

}
