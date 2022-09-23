import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './Services/cart.service';


@NgModule({
  imports: [
  CommonModule, 
  HttpClientModule,
]
})
export class OrdersModule {
  constructor(private cartService: CartService){
    this.cartService.initCartLocalStorage();
  }
}
