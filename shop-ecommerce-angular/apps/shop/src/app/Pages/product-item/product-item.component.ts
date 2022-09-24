import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '@shop-ecommerce-angular/orders';
import { CartItem } from '@shop-ecommerce-angular/orders';
import { Products } from '@shop-ecommerce-angular/products';
import {  MessageService } from 'primeng/api';

@Component({
  selector: 'shop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() Product !: Products;
  
  
  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.Product._id as string, quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this.addToCartSuccess();
  }

  addToCartSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: `Add product ${this.Product.name} to cart`});
  }

}
