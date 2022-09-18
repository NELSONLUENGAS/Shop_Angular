import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartItem } from '../Models/cart';
import { Products } from '../Models/products';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() Product : Products;
  
  
  constructor(private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.Product._id, quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this.addToCartSuccess();
  }

  addToCartSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: `Add product ${this.Product.name} to cart`});
  }
}
