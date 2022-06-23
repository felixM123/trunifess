import { Component, Input, OnInit } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-idisembarkation',
  templateUrl: './idisembarkation.component.html',
  styleUrls: ['./idisembarkation.component.scss']
})
export class IdisembarkationComponent implements OnInit {
  @Input() data: any;
  origen: string;
  destino: Agencia;
  cantidad: number = 0;
  fecha: any;
  type;
  token;
  constructor(
    private agenciaService: AgenciaService,
    private crypto: CryptoService
  ) {
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
  }
  ngOnInit() {
    this.obtenerAgencias();
    this.dateFormat();
  }
  dateFormat() {
    var res = this.data.fecha.replace(/-/g, "/");

    return res;

  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      if (this.data.tipo == 'DESEMBARCO') {
        for (const item in res) {
          if (this.data.origen == res[item].nombre) {
            this.origen = res[item].acronimo
          } else {
            if (this.data.destino == res[item].nombre) {
              this.destino = res[item];
            }
          }
        }
      }
    });
  }
}
