import { Component, OnInit } from '@angular/core';
import { CartService, Order, OrderItem, OrderService } from '@shop-ecommerce-angular/orders';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'shop-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  orderItems: OrderItem[] = [];
  order!: Order;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrderService,
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
