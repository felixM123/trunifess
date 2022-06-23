import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import { GLOBAL } from '../GLOBAL'; 
@Injectable({
  providedIn: 'root'
})
export class EmbarqueService {
  url: string;
  constructor(private http:HttpClient) {
    this.url = GLOBAL.url;
   }
   guardarEmbarque(type,token,embarco:any){
    let params = JSON.stringify(embarco);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}entrs/embarco`,params,{headers:headers});
   }
}
