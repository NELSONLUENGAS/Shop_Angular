import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { 
  constructor(private cartService: CartService){
    this.cartService.initCartLocalStorage();
  }
}
