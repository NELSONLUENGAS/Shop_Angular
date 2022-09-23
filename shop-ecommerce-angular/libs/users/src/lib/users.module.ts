import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/login/login.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

const UX_MODULE = [
  ToastModule, 
  DialogModule, 
  CardModule, FormsModule, 
  PasswordModule, 
  ButtonModule, 
  ReactiveFormsModule, 
  InputTextModule
];

export const usersRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    HttpClientModule,
    UX_MODULE,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [MessageService, ConfirmationService, UsersFacade]
})
export class UsersModule {}
