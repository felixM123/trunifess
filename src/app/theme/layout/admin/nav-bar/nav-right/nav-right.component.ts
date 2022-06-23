import { Component, DoCheck, OnInit, Input } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { DattaConfig } from '../../../../../app-config';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Usuario } from 'src/app/theme/shared/models/usuario';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  @Input() data: Usuario;
  toggleClass = 'ft-maximize';
  placement = 'bottom-right'
  agencias: any[];
  id: any;
  identity: any;
  agenPropio: string;
  rol: any;
  agencia_id: any;
  type;
  token;
  constructor(config: NgbDropdownConfig,
              private agenciaService: AgenciaService,
              private router: Router,
              private crypto: CryptoService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.identity = this.crypto.decodeData(localStorage.getItem('identity'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.data = this.identity;
    this.rol = this.identity.rol;
    this.obtenerAgencias();
    this.obtenerAgencia();
    this.agencia_id = this.id;
  }

  ngOnInit() {
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type, this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        this.agencias.push(res[item]);
      }
    });
  }
  obtenerAgencia() {
    this.agenciaService.obtenerAgencias(this.type, this.token).subscribe(res => {
      for (const item in res) {
        if (this.id == res[item].id) {
          this.agenPropio = res[item].nombre;
        } else {
        }
      }
    });
  }
  cambiarAgencia() {
    localStorage.setItem('id', this.crypto.encodeData(this.agencia_id));
    localStorage.setItem('id1', this.crypto.encodeData(this.agencia_id));
    if (this.agencia_id != this.id) {
      window.location.reload();
    }
  }
  editarPerfil(id) {
    this.router.navigate([`/perfil/editar/${id}`]);
  }
  cambiarContrasena(id) {
    this.router.navigate([`/editar/pass/${id}`]);

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }
}
