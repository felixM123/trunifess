import { Component, OnInit, Input } from '@angular/core';
import { Agencia } from 'src/app/theme/shared/models/agencia';

import { Literal } from 'src/app/theme/shared/models/literal';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-ireception',
  templateUrl: './ireception.component.html',
  styleUrls: ['./ireception.component.scss'],
  providers:[Literal]
})
export class IreceptionComponent implements OnInit {
  @Input() datos: any;
  @Input() estilo: string;
  ticket: any;
  origen: string;
  destino: Agencia;
  cantidad: number = 0;
  fecha: any;
  letras;
  type;
  token;
  constructor(
    private agenciaService: AgenciaService,
    private literal: Literal,
    private crypto: CryptoService
  ) {
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
  }
  ngOnInit() {
    this.obtenerAgencias();

  }
  dateFormat() {
    var res = this.datos.fecha.replace(/-/g, "/");
    return res;
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.datos.destino == res[item].nombre) {
          this.origen = res[item].acronimo
        } else {
          if (this.datos.origen == res[item].nombre) {
            this.destino = res[item];
          }
        }
      }
      this.ticket = {
        guia: this.datos.guia,
        fecha: this.datos.fecha,
        origen: this.destino.acronimo,
        destino: this.origen,
        observacion: this.datos.observacion
      }
    });
    this.letras = this.numeroLetras(this.datos.total)
  }
  numeroLetras(data:number){
    return this.literal.numeroALetras(data,{
        plural: 'Bolivianos',
        singular: 'Bolivianos',
        centPlural: 'Bolivianos',
        centSingular: 'Bolivianos'
      });
  }
}
