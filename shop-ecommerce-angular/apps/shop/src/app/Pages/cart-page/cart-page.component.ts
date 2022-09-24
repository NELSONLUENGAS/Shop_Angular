import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shop-ecommerce-angular/orders';
import { Subject } from 'rxjs';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { CartService } from '@shop-ecommerce-angular/orders';
import { ProductService } from '@shop-ecommerce-angular/products';
import { Router } from '@angular/router';
import { Products } from '@shop-ecommerce-angular/products';


@Component({
  selector: 'shop-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  endSubs$: Subject<any> = new Subject();
  cart!: CartItem[];
  cartProductItems: Products[]  = [];
  constructor(
    private messageService: MessageService, 
    private cartService: CartService, 
    private productsSetrvice: ProductService, 
    private router:Router, 
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart.items;
      const newCart: Products[] = [];
      for(const cartItem of this.cart){
        this.productsSetrvice.getProductById(cartItem.productId).subscribe( product => {
          product.data.quantity = cartItem.quantity;
          newCart.push(product.data);
        })
      }
      this.cartProductItems = newCart;
    })
  }
  
  backToShop(){
    this.router.navigateByUrl('/products')
  }

  updateCartQuantity(event: any, id: string){
    this.cartService.setCartItem({
      productId: id,
      quantity: event.value
    },true)
  }


  deleteCartItem(id: string){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this product?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.cartService.deleteCartItem(id);
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Product deleted successfuly'});
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'Product is not deleted'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'Product is not deleted'});
                break;
            }
        }
      });
  }

}
