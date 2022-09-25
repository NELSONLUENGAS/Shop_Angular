import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginFormGroup!: FormGroup;
  isSubmitted = false;
  display = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    // private route: ActivatedRoute,
    private LocalStaorageService: LocalStorageService
    ) { }


  ngOnInit(): void {
    this._initLoginForm();
    this._checkSessionActive();
  }

  private _initLoginForm(){
    this.LoginFormGroup = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required]
    })
  }

  private _checkSessionActive(){
    const token = this.LocalStaorageService.getItem('token');
    // if(token){
    //   const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
    //   console.log(tokenDecode.isAdmin)
    //   if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
    //     window.location.href = 'https://shop-angular-admin.vercel.app';
    //   }else if(!tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
    //     window.location.href = 'https://shop-angular-shop-ecommerce-angular-n93j.vercel.app';
    //   }
    // }
    console.log(token) 
  }

  private _tokenExpired(expired: number): boolean{
    return Math.floor(Date.now() / 1000) >= expired;
  }

  get LoginForm() {
    return this.LoginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.LoginFormGroup.invalid) return;
    this.display = true;

    this.authService.Login(this.LoginForm['email'].value, this.LoginForm['password'].value).subscribe((user: any) => {
      if(user.token){
        this.LocalStaorageService.setItem('token', user.token);
        const isAdmin = JSON.parse(window.atob(user.token.split('.')[1])).isAdmin;
        timer(2000).subscribe(() =>{
          this.display = false;
          !isAdmin ? window.location.href = `https://shop-angular-shop-ecommerce-angular-n93j.vercel.app` : window.location.href = `https://shop-angular-admin.vercel.app`;
        })
      }else{
        this.display = false;
        if(user.msg === 'Password is wrong'){
          this.messageService.add({
            severity:'warn', 
            summary:'Warning', 
            detail: user.msg
          });
        }else{
          this.messageService.add({
            severity:'error', 
            summary:'Error', 
            detail: user.msg
          });
        }
      }
    });
  }

}
