import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  cartCountItems: string = '0';
  constructor(private cartService: CartService,) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe( cart => {
      this.cartCountItems = cart?.items.length.toString();
    })
  }
}
