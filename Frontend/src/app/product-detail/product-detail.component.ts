import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartItem } from '../Models/cart';
import { Products } from '../Models/products';
import { CartService } from '../service/cart.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Products ;
  id: string;
  val: any = 3.5;
  quantity: number = 1;

  constructor(private messageService: MessageService, private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(response => {
      this.id = response['productId'];
    })
    this._getProductById(this.id);
  }

  _getProductById(id: string){
    this.productsService.getProductById(id).subscribe(product => {
      this.product = product.data;
    })
  }

  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
    this.addToCartSuccess();
  }

  addToCartSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: `Add product ${this.product.name} to cart`});
  }

  toCheckout(){
    this.router.navigateByUrl('/checkout')
  }
}
