import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
  public encodeData(data) {
    return btoa(JSON.stringify(data));
  }
  public decodeData(encript) {
    return JSON.parse(atob(encript));
  }
}
