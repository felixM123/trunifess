import { Component, OnInit,Input } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-ireimprimir-reception',
  templateUrl: './ireimprimir-reception.component.html',
  styleUrls: ['./ireimprimir-reception.component.scss']
})
export class IreimprimirReceptionComponent implements OnInit {
  @Input() data: any;
  origen: string;
  destino: any={};
  cantidad: number = 0;
  fecha: any;
  acronimoD:any;
  type;
  token;
  constructor(private agenciaService: AgenciaService,private crypto: CryptoService
   ) {
      this.obtenerAgencias1();
      this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    }

  ngOnInit() {


  }
  dateFormat() {
    var res = this.data.fecha.replace(/-/g, "/");
    return res;
  }
  obtenerAgencias1() {
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
        }else{
          for (const item in res) {
            if (this.data.destino==res[item].nombre) {
              this.acronimoD=res[item].acronimo;

            }
          }
        }


    });
  }



}
