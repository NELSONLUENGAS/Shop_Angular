import { Component, OnInit } from '@angular/core';
import { CartService } from '@shop-ecommerce-angular/orders';
import { ProductService } from '@shop-ecommerce-angular/products';
import { Products } from '@shop-ecommerce-angular/products';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { CartItem } from '@shop-ecommerce-angular/orders';

@Component({
  selector: 'shop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product!: Products;
  id!: string;
  val: any = 3.5;
  quantity = 1;

  constructor(
    private messageService: MessageService, 
    private productsService: ProductService, 
    private route: ActivatedRoute, 
    private cartService: CartService, 
    private router: Router
    ) { }

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
      productId: this.product._id as string,
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
