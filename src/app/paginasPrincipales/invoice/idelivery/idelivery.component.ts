import { Component, OnInit, Input } from '@angular/core';

import { Agencia } from 'src/app/theme/shared/models/agencia';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';


@Component({
  selector: 'app-idelivery',
  templateUrl: './idelivery.component.html',
  styleUrls: ['./idelivery.component.scss']
})
export class IdeliveryComponent implements OnInit {
  @Input() data: any;
  @Input() user: any;
  origen: string;
  destino: Agencia;
  numeroLetra: any;
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
  }

  obtenerAgencias() {

    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.data.origen == res[item]['nombre']) {
          this.origen = res[item]['acronimo'];
        }
        if (this.data.destino == res[item]['id']) {
          this.destino = res[item];
        }
      }

    });


  }

}
