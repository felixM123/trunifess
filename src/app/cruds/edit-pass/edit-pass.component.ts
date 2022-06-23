import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.scss']
})
export class EditPassComponent implements OnInit {
  userPass = {
    id: 0,
    password:'',
    password_confirmation:''
  }
  user:any;
  type:any;
  token:any;
  mensaje:any;
  constructor(private router: Router,
              private crypto: CryptoService,
              private usuarioService: UsuarioService,
              private msj:MensajesService) {

                this.type = this.crypto.decodeData(localStorage.getItem("type"));
                this.token = this.crypto.decodeData(localStorage.getItem("token"));
                this.user = this.crypto.decodeData(localStorage.getItem("identity"));
               }

  ngOnInit() {
  }
  onSubmit(){
    this.userPass.id=this.user.id;
    this.usuarioService.editPass(this.type, this.token, this.userPass).subscribe(res => {

      if(Object.keys(res).length === 0 == true){
        this.msj.mensajeError('Error','error al modificar')
      }else if (res['errors']) {
        this.msj.mensajeError('Error','Error al modificar')
      }
      else{
        this.msj.mensajeCorrecto('Correcto','Su contraseña fue modificado correctamente')
        this.router.navigate(['/inicio']);
      }
    });
  }
  volver() {
    this.router.navigate(['/inicio']);
  }
}
