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
}
