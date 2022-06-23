import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/theme/shared/models/login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
import { error } from 'protractor';
@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  user: Login = {
    email: '@truni.com',
    password: '',

  }
  user1={
    email: '@truni.com',
    password: '',
  }
  correo: string;
  token;
  type;
  identity;
  msg: string;
  estado: any;
  id: any;
  mensaje: any;
  cargando: boolean = true;
  identidad:any;
  constructor(private router: Router, private usuarioService: UsuarioService,
              private msj: MensajesService,private crypto:CryptoService) { }

  ngOnInit() {
    // si esta logueado inicia sesion directo
    if(this.identidad==''){
      this.identidad = this.usuarioService.obtenerIdentidad();
    }
    if (this.identidad) {
      this.router.navigate(['/inicio'])
    }
  }
  onSubmit() {
    this.cargando=false;
    this.user.email = this.correo + this.user.email;
    //loguin normal
    this.usuarioService.login(this.user).subscribe(res => {

      if (res['message'] == 'Usuario o Contraseña incorrectos. Verifique los datos.') {
        this.msj.mensajeError('Error', 'Usuario o Contraseña incorrectos. Verifique los datos.');
        this.correo = '';
        this.user.email = '@truni.com';
        this.cargando=true;
      } else {
        this.obtnerUsuario(res);
      }
    },error=>{
      this.msj.mensajeError('Error','Error vuelva a intentarlo');
      this.cargando=true;
      this.correo = '';
        this.user.email = '@truni.com';
    });
    //login de sentinela para sacar otras tablas
    this.usuarioService.login2(this.user).subscribe(res => {
      if (res['message'] == 'Usuario o Contraseña incorrectos. Verifique los datos.') {
        this.msj.mensajeError('Error', 'Usuario o Contraseña incorrectos. Verifique los datos.');
        this.correo = '';
        this.user.email = '@truni.com';
      } else {
        this.obtnerUsuario1(res);

      }
    },error=>{
      this.msj.mensajeError('Error','Error vuelva a intentarlo');
      this.cargando=true;
      this.correo = '';
        this.user.email = '@truni.com';
      });
  }
 //obtener usuario normal
 obtnerUsuario(data: any) {

  if (!this.identity) {
    this.identity = {
      id: data['id'],
      nombre: data['nombre'],
      rol: data['rol'],
      agen_id: data['agen_id']
    }
    this.obtenerToken(data);

    localStorage.setItem('identity', this.crypto.encodeData(this.identity));
    this.router.navigate(['/'])
  } else {

    this.msj.mensajeError('Error', 'Error al identificarse');
  }
}
//token sentinela
obtenerToken(data: any) {

  if (!this.token && !this.type) {
    this.token = data['access_token'];
    this.type = data['token_type'];
    this.id = data['agen_id'];
    localStorage.setItem('token', this.crypto.encodeData(this.token));
    localStorage.setItem('type', this.crypto.encodeData(this.type));
    localStorage.setItem('id', this.crypto.encodeData(this.id));
  } else {
    this.msj.mensajeError('Error', 'Error de conexion');
  }
}
  //obtener usuario setinela
  obtnerUsuario1(data: any) {
    if (this.identity) {
      this.identity = {
        id: data['id'],
        nombre: data['nombre'],
        rol: data['rol'],
        agen_id: data['agen_id']
      }
        this.obtenerToken1(data);
      localStorage.setItem('identity1', this.crypto.encodeData(this.identity));
      this.router.navigate(['/']);
    } else {
      this.msj.mensajeError('Error', 'Error al identificarse');
    }
  }
  //token sentinela
  obtenerToken1(data: any) {
    if (this.token && this.type) {
      this.token = data['access_token'];
      this.type = data['token_type'];
      this.id = data['agen_id']
      localStorage.setItem('token1', this.crypto.encodeData(this.token));
      localStorage.setItem('type1', this.crypto.encodeData(this.type));
      localStorage.setItem('id1', this.crypto.encodeData(this.id));
      this.cargando=true
    } else {
      this.msj.mensajeError('Error', 'Error de conexion')
    }
  }
}
