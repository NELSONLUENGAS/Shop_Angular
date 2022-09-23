import { Component, OnInit } from '@angular/core';
import { CartService } from '@shop-ecommerce-angular/orders';

@Component({
  selector: 'shop-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  cartCountItems = '0';
  constructor(private cartService: CartService,) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe( cart => {
      this.cartCountItems = cart?.items.length.toString();
    })
  }
}
