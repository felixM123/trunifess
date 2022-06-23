import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios, UsuarioUp } from 'src/app/theme/shared/models/usuario';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuario: Usuarios = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    rol: '',
    agen_id:0
  }
  agencia={
    id:0
  }
  userId = {
    id: 0,
  }
  usuarioUp: UsuarioUp = {
    id: 0,
    name: '',
    email: '',
    rol: '',
    agen_id:0
  }
  role=['ASISTENTE','AUXILIAR','ENCARGADO','ADMINISTRADOR'];
  titulo:string;
  boton:string;
  id: number;
  name: string;
  email: string;
  rol: string;
  agen_id:number;
  agencias:any[];
  type: any;
  token: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService,
              private agenciaService: AgenciaService,
              private msj:MensajesService,
              private crypto: CryptoService
              )
  {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));

   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.titulo = 'Editar usuario';
      this.boton='Editar'
      this.obtenerUsuario();
      this.obtenerAgencia();
    } else {
      this.titulo = 'Nuevo usuario';
      this.boton='Registrar'
      this.obtenerAgencia();
    }
  }
  obtenerAgencia(){
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        this.agencias.push(res[item]);
      }
    });
    }
    obtenerUsuario() {
      this.userId.id = this.id;
      this.usuarioService.obtenerunUsuario(this.type, this.token, this.userId).subscribe(res => {
        this.usuario.name =res['name'];
        this.usuario.email = res['email'];
        this.usuario.rol =  res['rol'];
        this.usuario.agen_id=res['agen_id'];
      });
    }
    volver() {
      this.router.navigate(['/lista/usuarios'])
    }
    onSubmit(){
      if (this.id) {

        this.usuarioUp.id = this.id;
        this.usuarioUp.name = this.usuario.name;
        this.usuarioUp.email = this.usuario.email;

        this.usuarioUp.rol = this.usuario.rol;
        this.usuarioUp.agen_id=this.usuario.agen_id;
        this.usuarioService.actualizarUsuario(this.type, this.token, this.usuarioUp).subscribe(res => {
          if(Object.keys(res).length === 0 == true){
            this.msj.mensajeError('Error','Error al modificar los datos');
          }else if (res['errors']) {
            this.msj.mensajeError('Error','Error al modificar los datos')
          }
          else{
            this.msj.mensajeCorrecto('Correcto','Se modificaron correctamente los datos');
            this.router.navigate(['/lista/usuarios']);
          }

        },error=>{
          this.msj.mensajeError('Error','Error al modificar los datos vuelva a intentarlo......')
        });

    }
    else {
      if (this.usuario.password == this.usuario.password_confirmation) {
        this.usuarioService.agregarUsuario(this.type, this.token, this.usuario).subscribe(res => {
          if(Object.keys(res).length === 0 == true ){
            this.msj.mensajeError('Error','Error al registrar los datos');
          }else if (res['errors']) {
            this.msj.mensajeError('Error','Error al registrar los datos');
          }
           else {
            this.msj.mensajeCorrecto('Correcto','Se registro correctamente los datos')
            this.router.navigate(['/lista/usuarios']);
          }
        },error=>{
          this.msj.mensajeError('Error','Error al registrar los datos vuelva a intentarlo......')
        });
      } else {
        this.msj.mensajeAdvertencia('Advertencia','Las contraseñas no coinciden')
      }
    }
    }
}
