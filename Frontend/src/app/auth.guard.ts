import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if(token){
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
      if(!this._tokenExpired(tokenDecode.exp)){
        return true;
      }
    }
    this.router.navigateByUrl('/login');
    return false
  }

  private _tokenExpired(expired: number): boolean{
    return Math.floor(Date.now() / 1000) >= expired;
  }
}
