import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../GLOBAL';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string;
  url3: string;
  usuarios: Usuario[];
  usuario: Usuario;
  identidad;
  token;
  constructor(
    public http: HttpClient,
    private crypto: CryptoService
  ) {
    this.url = GLOBAL.url;

  }

  obtenerUsuario(type,token) {
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.get(`${this.url}user/index`,{headers:headers});

  }
  agregarUsuario(type,token,usuarios) {
    let params = JSON.stringify(usuarios);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/store`,params,{headers:headers});
  }
  actualizarUsuario(type,token,usuario) {
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/update`,params,{headers:headers});
  }
  obtenerunUsuario(type,token,id){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/show`,params,{headers:headers});
  }

  bloquearUsuario(type,token,id) {
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/destroy`,params,{headers:headers});
  }
  login(user:any){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(`${this.url}auth/login`,params,{headers:headers});
  }
  login2(user:any){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(`${this.url}auth/login`,params,{headers:headers});
  }

  obtenerIdentidad() {
    let identidad = this.crypto.decodeData(localStorage.getItem('identity'));
    console.log(identidad);
    if (identidad != "undefined") {
      this.identidad = identidad;
    } else {
      this.identidad = null;
    }
    return this.identidad;
  }
  obtenerToken(){
    let token = this.crypto.decodeData(localStorage.getItem('token'));
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
  obtenerUsuarioPorAgencia(type,token,id){
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/usuarios_agencia`,params,{headers:headers});

  }
  editPass(type,token,user){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization',`${type} ${token}`);
    return this.http.post(`${this.url}user/update_pass`,params,{headers:headers});
  }a

}
