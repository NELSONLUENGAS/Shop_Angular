import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent implements OnInit {
  LoginFormGroup : FormGroup;
  isSubmitted : boolean = false;
  display: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
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
    if(token){
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1])).isAdmin;
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
        this.router.navigateByUrl('/admin')
      }else if(!tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
        this.router.navigateByUrl('/')
      }else{
        this.router.navigateByUrl('/')
      }
    }
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
        timer(2000).subscribe(response =>{
          this.display = false;
          this.router.navigateByUrl(isAdmin ? '/admin' : '/');
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
