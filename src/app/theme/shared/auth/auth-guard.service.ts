import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class AuthGuard implements CanActivate {
  identity:any;
  constructor(
    private router:Router,
    private userService: UsuarioService
  ) { }

  canActivate() {
    if (localStorage.length==0) {
      this.identity=[];
    }else{
      this.identity=this.userService.obtenerIdentidad();
    }
    if(this.identity&&(this.identity.rol=='ADMINISTRADOR'||this.identity.rol=='SUPER'||this.identity.rol=='ENCARGADO'||this.identity.rol=='AUXILIAR'||this.identity.rol=='ASISTENTE')){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
