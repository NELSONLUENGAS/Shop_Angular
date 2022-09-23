import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@shop-ecommerce-angular/orders';
import { ProductService } from '@shop-ecommerce-angular/products';
import { takeUntil, Subject, take } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shop-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  endSubs$: Subject<any> = new Subject();
  totalPrice!: number;
  checkOutMode = false;
  constructor(
    private cartService: CartService, 
    private productsService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._getOrderSummary();
    this._verifyCheckoutMode();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  toCheckout(){
    this.router.navigateByUrl('/checkout')
  }

  _verifyCheckoutMode(){
    this.route.url.subscribe(url => {
      if(url[0].path == 'checkout'){
        this.checkOutMode = true;
      }
    })
  }

  _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0;
      if(cart){
        cart.items.map( item => {
          this.productsService.getProductById(item.productId).pipe(take(1)).subscribe(product => {
            if(product?.data?.price){
              this.totalPrice += product.data.price * item.quantity;
            }
          })
        })
      }
    })
  }

}
