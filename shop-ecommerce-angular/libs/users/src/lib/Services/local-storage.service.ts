import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  setItem(key: string, data: object | string){
    const dataToJSON = JSON.stringify(data);
    if(typeof data !== 'object'){
      localStorage.setItem(key, data)
    }else{
      localStorage.setItem(key, dataToJSON)
    }
  }
  getItem(key: string){
    return localStorage.getItem(key);
  }
  removeItem(key: string){
    localStorage.removeItem(key);
  }

  isValidToken(){
    const token = localStorage.getItem('token');
    if(token){
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
      return this._tokenExpired(tokenDecode.exp);
    }else{
      return false;
    }
  }


  getUserIdFromToken(){
    const token = localStorage.getItem('token');
    if(token){
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
      return tokenDecode ? tokenDecode.userId : null;
    }else{
      return null;
    }
  }

  _tokenExpired(expired: number): boolean{
    return Math.floor(Date.now() / 1000) >= expired;
  }
}
