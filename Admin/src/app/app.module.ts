import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AppComponent } from './app.component';
import { ShellComponent } from './components/shell/shell.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CategoriesService } from 'src/app/service/categories.service';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { ToastModule } from 'primeng/toast';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandFormComponent } from './components/brand-list/brand-form/brand-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { MomentModule } from 'ngx-moment';
import { PaginatorModule } from 'primeng/paginator';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from './components/login/login.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { JwtInterceptor } from './service/jwt.interceptor';
import { SidebarModule } from 'primeng/sidebar';




@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    BrandListComponent,
    BrandFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MomentModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule,
    TagModule,
    PasswordModule,
    DividerModule,
    SidebarModule
  ],
  providers: [
    CategoriesService, 
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
export class AppModule { }
