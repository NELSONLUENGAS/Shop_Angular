import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule} from 'primeng/accordion';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ShopNavComponent } from './shop-nav/shop-nav.component';
import { SearchComponent } from './search/search.component';
import { RippleModule } from 'primeng/ripple';
import { BannerComponent } from './banner/banner.component';
import { CategoriesBannerComponent } from './categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ContactComponent } from './contact/contact.component';
import { ButtonModule } from 'primeng/button';
import { ProductItemComponent } from './product-item/product-item.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrdersModule } from './module/orders/orders.module';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './cart-page/cart-page.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { UsersModule } from 'projects/users/src/public-api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JwtInterceptor } from './service/jwt.interceptor';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { SuccessComponent } from './success/success.component';


const { STRIPE_PUBLIC_KEY } = environment;

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    ShopNavComponent,
    SearchComponent,
    BannerComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ContactComponent,
    ProductItemComponent,
    ProductDetailComponent,
    GalleryComponent,
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    LoginComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    RippleModule,
    ButtonModule,
    HttpClientModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    InputNumberModule,
    OrdersModule,
    BadgeModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    PasswordModule,
    CardModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot(STRIPE_PUBLIC_KEY)
  ],
  providers: [MessageService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
