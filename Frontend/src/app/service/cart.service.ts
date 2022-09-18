import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$:BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() { }

  initCartLocalStorage(){
    const cart : Cart = this.getCart();
    if(!cart){
      const initialCart = {
        items: []
      }
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  getCart(): Cart{
    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean){
    const cart: Cart = this.getCart();
      const productExist = cart?.items.find(item => item.productId === cartItem.productId)
      if(productExist){
        cart.items.map(item => {
          if(item.productId === cartItem.productId){
            if(updateCartItem){
              item.quantity = cartItem.quantity;
            }else{
              item.quantity += cartItem.quantity;
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
      }else{
        cart?.items.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      this.cart$.next(cart);
  }

  emptyCart(){
    const initialCart = {
      items: []
    }
    localStorage.setItem('cart', JSON.stringify(initialCart));
    this.cart$.next(initialCart)
  }

  deleteCartItem(productId: string){
    const cart = this.getCart();
    const newCart = cart.items.filter(item => item.productId !== productId);

    cart.items = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));

    this.cart$.next(cart);
  }
}
