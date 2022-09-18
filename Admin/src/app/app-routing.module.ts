import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './components/brand-list/brand-form/brand-form.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShellComponent } from './components/shell/shell.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: ShellComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'brands',
        component: BrandListComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'brands/form',
        component: BrandFormComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'brands/form/:id',
        component: BrandFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
    ]
  },{
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
