import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shop-ecommerce-angular/users';
import { LoginComponent } from '@shop-ecommerce-angular/users';
import { BrandsFormComponent } from './Brands/brands-form/brands-form.component';
import { BrandsListComponent } from './Brands/brands-list/brands-list.component';
import { CategoriesFormComponent } from './Categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './Categories/categories-list/categories-list.component';
import { OrdersListComponent } from './Orders/orders-list/orders-list.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ProductsFormComponent } from './Products/products-form/products-form.component';
import { ProductsListComponent } from './Products/products-list/products-list.component';
import { ShellComponent } from './Shared/shell/shell.component';
import { UsersListComponent } from './Users/users-list/users-list.component';

const routes: Routes = [
    {
        path: 'admin',
        component: ShellComponent,
        canActivate:[AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'brands',
                component: BrandsListComponent
            },
            {
                path: 'brands/form',
                component: BrandsFormComponent
            },
            {
                path: 'brands/form/:id',
                component: BrandsFormComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'orders',
                component: OrdersListComponent
            },
        ]
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    // {
    //     path: '**',
    //     redirectTo: 'admin',
    //     pathMatch: 'full'
    // }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}