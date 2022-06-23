import { Component, OnInit, Input } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-money-invoice',
  templateUrl: './money-invoice.component.html',
  styleUrls: ['./money-invoice.component.scss']
})
export class MoneyInvoiceComponent implements OnInit {
  @Input() data:any;
  origen: string;
  destino: Agencia;
  type;
  token;
  constructor( private agenciaService: AgenciaService,private crypto: CryptoService)
  {
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
   }

  ngOnInit() {
    this.obtenerAgencias();


  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.data.destino == res[item].nombre) {
          this.origen = res[item].acronimo

        } else {
          if (this.data.origen == res[item].nombre) {

            this.destino = res[item];

          }
        }
      }

    });

  }

}
