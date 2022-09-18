import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsersService } from 'projects/users/src/public-api';
import { takeUntil, timer } from 'rxjs';
import { Cart } from '../Models/cart';
import { countries } from '../Models/countries';
import { Order } from '../Models/orders';
import { CartService } from '../service/cart.service';
import { CountriesService } from '../service/countries.service';
import { OrdersService } from '../service/orders.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  isSubmitted: boolean = false;
  countries: countries[] = [];
  cities: object[] = [];
  countrySelectedState: boolean = true;
  orderItems: any[] = [];
  userId: string | undefined;
  totalPrice: number ;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private productService: ProductsService,
    private messageService: MessageService,
    private usersService: UsersService,
    ) { }

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
    this._getCartItems();
    this._autoFillUserData();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: [''],
      apartment: [''],
      street: ['']
    });
  }

  private _autoFillUserData(){
    this.usersService
      .observeCurrentUser()
      .subscribe( user => {
        if(user){
          this.userId = user._id;
          this.checkoutForm['name'].setValue(user.firstname);
          this.checkoutForm['email'].setValue(user.email);
        }
      })
  }

  private _getCartItems(){
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items;
    let totalprice: number = 0;
    for(let item of this.orderItems){
      this.productService.getProductById(item.productId).subscribe(response => {
        const priceItem = response.data.price * item.quantity
        totalprice += priceItem;
        this.totalPrice = totalprice;
      });
    }
  }

  toPlaceOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    this.ordersService.createCheckoutSession(this.orderItems).subscribe( error => {
      if(error){
        console.log(error);
      }
    })
    const order: Order = {
      orderItems: this.orderItems,
      shippingAnddress1: this.checkoutForm['street'].value,
      shippingAnddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 'PROCESSED',
      totalPrice: this.totalPrice,
      userID: this.userId,
    }
    this.ordersService.cacheOrderData(order);
  }

  filterCities(event: any){
    if(event.value){
      this.countrySelectedState = false;
      const cities = this.countries.find(country => country.name === event.value)?.cities
      if(cities?.length){
        for(let city of cities){
          const cityObj = {
            name: city
          }
          this.cities.push(cityObj);
        }
      }
    }else{
      this.cities = [];
      this.countrySelectedState = true;
    }
  }

  _getCountries(){
    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries;
    })
  }
  backToCart(){
    this.router.navigateByUrl('/cart')
  }

  get checkoutForm() {
    return this.checkoutFormGroup?.controls;
  }

  
}
