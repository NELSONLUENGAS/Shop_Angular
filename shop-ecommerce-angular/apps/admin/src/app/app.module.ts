import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ShellComponent } from './Shared/shell/shell.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './Categories/categories-list/categories-list.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CategoriesFormComponent } from './Categories/categories-form/categories-form.component';
import { BrandsListComponent } from './Brands/brands-list/brands-list.component';
import { BrandsFormComponent } from './Brands/brands-form/brands-form.component';
import { OrdersListComponent } from './Orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './Orders/orders-detail/orders-detail.component';
import { ProductsListComponent } from './Products/products-list/products-list.component';
import { ProductsFormComponent } from './Products/products-form/products-form.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { UsersDetailComponent } from './Users/users-detail/users-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrandService, CategoryService, ProductService } from '@shop-ecommerce-angular/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, UserService, UsersModule } from '@shop-ecommerce-angular/users';


const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    InputNumberModule,
    TooltipModule,
    FileUploadModule,
    DropdownModule,
    InputTextareaModule,
    EditorModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule,
    TagModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule
]
@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    ShellComponent, 
    SidebarComponent, 
    CategoriesListComponent, 
    CategoriesFormComponent, 
    BrandsListComponent, 
    BrandsFormComponent, 
    OrdersListComponent, 
    OrdersDetailComponent, 
    ProductsListComponent, 
    ProductsFormComponent, 
    UsersListComponent, 
    UsersDetailComponent,
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule,
    UX_MODULE,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    CategoryService,
    BrandService,
    ProductService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
