import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  getItem(item){
    return localStorage.getItem("tpqa."+item);
  }
  setItem(item,value){
    localStorage.setItem("tpqa."+item, value);
  }
  removeItem(item){
    localStorage.removeItem("tpqa."+item);
  }

}
