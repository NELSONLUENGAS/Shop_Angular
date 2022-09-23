import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shop-ecommerce-angular/users';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './Pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { SuccessComponent } from './Pages/success/success.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'products/:productId',
        component: ProductDetailComponent
    },
    {
        path: 'category/:categoryId',
        component: ProductListComponent
    },
    // {
    //     path: 'contact',
    //     component: ContactComponent
    // },
    {
        path: 'cart',
        component: CartPageComponent
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: 'success',
        component: SuccessComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutPageComponent
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}