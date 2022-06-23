import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario, UsuarioUp } from 'src/app/theme/shared/models/usuario';
import {MensajesService} from 'src/app/theme/shared/services/mensajes.service'
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario: UsuarioUp = {
    id: 0,
    name: '',
    email: '',

    rol: '',
    agen_id:0
  }
  userId = {
    id: 0,
  }
  type;
  token;
  user;
  agencias:any[];

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private agenciaService: AgenciaService,
    private crypto: CryptoService,
    private msj:MensajesService) {

      this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.user = this.crypto.decodeData(localStorage.getItem("identity"));
    }
  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerAgencia();
  }
  volver() {
    this.router.navigate(['/inicio']);
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
    this.userId.id = this.user.id;
    this.usuarioService.obtenerunUsuario(this.type, this.token, this.userId).subscribe(res => {
      this.usuario.name = res['name'];
      this.usuario.email = res['email'];
      this.usuario.rol = res['rol'];
      this.usuario.agen_id=res['agen_id'];
    });
  }
  onSubmit() {
      this.usuario.id = this.user.id;
      this.usuarioService.actualizarUsuario(this.type, this.token, this.usuario).subscribe(res => {
        if(Object.keys(res).length === 0 == true){
          this.msj.mensajeError('Error','Error al modificar')
        }else if (res['errors']) {
          this.msj.mensajeError('Error','Error al registrar los datos')
        }
        else{
          this.msj.mensajeCorrecto('Correcto','Sus datos se modificaron correctamente')
          this.router.navigate(['/inicio']);
        }

      });

  }

}
