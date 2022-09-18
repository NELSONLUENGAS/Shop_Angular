import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private LocalStaorageService: LocalStorageService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.LocalStaorageService.getItem('token');
    if(token){
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
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
