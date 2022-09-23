import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { UiModule } from '@shop-ecommerce-angular/ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderService, OrdersModule } from '@shop-ecommerce-angular/orders';
import { JwtInterceptor, UserService, UsersModule } from '@shop-ecommerce-angular/users';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SearchComponent } from './Components/search/search.component';
import { NavComponent } from './Components/nav/nav.component';
import { CartIconComponent } from './Components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ProductItemComponent } from './Pages/product-item/product-item.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './Pages/checkout-page/checkout-page.component';
import { SuccessComponent } from './Pages/success/success.component';
import { OrderSummaryComponent } from './Components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturedProductsComponent } from './Components/featured-products/featured-products.component';
import { environment } from '../environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule  } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


const { STRIPE_PUBLIC_KEY } = environment;

const UX_MODULE = [
  OrdersModule,
  UsersModule,
  BadgeModule,
  CardModule,
  PasswordModule,
  DropdownModule,
  InputMaskModule,
  InputTextModule,
  ConfirmDialogModule,
  DialogModule,
  ToastModule,
  InputNumberModule,
  RatingModule,
  CheckboxModule,
  ButtonModule,
  RippleModule,
  ReactiveFormsModule,
  FormsModule
]

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
    ProductListComponent, 
    HeaderComponent, 
    FooterComponent, 
    SearchComponent, 
    NavComponent, 
    CartIconComponent, 
    ProductItemComponent, 
    ProductDetailComponent, 
    CheckoutPageComponent, 
    SuccessComponent, 
    OrderSummaryComponent,
    CartPageComponent,
    FeaturedProductsComponent,
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule,
    UX_MODULE,
    BrowserAnimationsModule,
    UiModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot(STRIPE_PUBLIC_KEY),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [
    OrderService,
    UserService,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
