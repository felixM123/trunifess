import { Component, OnInit,Input } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-iremoney',
  templateUrl: './iremoney.component.html',
  styleUrls: ['./iremoney.component.scss']
})
export class IremoneyComponent implements OnInit {
  @Input() dato:any;
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
        if (this.dato.destino == res[item].nombre) {
          this.origen = res[item].acronimo

        } else {
          if (this.dato.origen == res[item].nombre) {

            this.destino = res[item];

          }
        }
      }

    });

  }
}
