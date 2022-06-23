import { Component, OnInit } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { RegisterEntryService } from 'src/app/theme/shared/services/register-entry.service';
import { Literal } from 'src/app/theme/shared/models/literal';
import * as wjcCore from "wijmo/wijmo";
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-vista-ie1',
  templateUrl: './vista-ie1.component.html',
  styleUrls: ['./vista-ie1.component.scss'],
  providers: [Literal]
})
export class VistaIE1Component implements OnInit {

  agencias: any[];
  id1:any;
  id:any;
  origen:any;
  agenPropio:any;
  reimprimir = {
    id: ''
  }
  ingreso:any=[];
  dato:any;
  literal;
  monto:any;
  type;
  token;
  loadingState:boolean=false;
  constructor( private agenciaService: AgenciaService,
               private registroService:RegisterEntryService,
                private lit: Literal,
                private route: ActivatedRoute,
                private router:Router,
                private crypto: CryptoService)
            {
              this.id1=this.crypto.decodeData(localStorage.getItem('id'));
              this.type=this.crypto.decodeData(localStorage.getItem('type'));
              this.token=this.crypto.decodeData(localStorage.getItem('token'));
             }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.obtenerAgencias();
    this.ver();
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
        this.agencias = [];
        for (const item in res) {
            if (this.id1 == res[item].id) {
                this.agenPropio = res[item]['nombre'];

                this.origen=this.agenPropio;
            } else {
            }
        }
    });

  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice"));
    doc.print();
  }
  imprimir(){
    setTimeout(() => {
      this.printDocument();

    }, 1000);
  }
  volver(){

    this.router.navigate([`egreso-dinero`]);
  }
  ver(){
    this.reimprimir.id=this.id;

    this.registroService.reporteDetalleIngreso(this.reimprimir,this.type,this.token).subscribe(res=>{

      for (const data in res) {
        this.ingreso.push({
          nombre: res[data]['detalle'],
          valor: res[data]['monto'],

        });

      }
      this.registroService.reporteReimprecionIngreso(this.reimprimir,this.type,this.token).subscribe(res=>{

        this.monto=res[0]['monto'],
        this.literal = this.lit.numeroALetras(this.monto, {
          plural: "Bolivianos",
          singular: "Bolivianos",
          centPlural: "Bolivianos",
          centSingular: "Bolivianos"
        });

        this.dato={
          hora1:res[0]['hora'],
          numero_transaccion1:res[0]['numero'],
          tipo:res[0]['tipo'],
          titulo:'REGISTRO DE SALIDA DE EFECTIVO',
          de: res[0]['de'],
          para: res[0]['para'],
          fecha: res[0]['fecha'],
          detalle: res[0]['observacion'],
          monto:res[0]['monto'],
          literal: this.literal,
          detalles: this.ingreso,
          origen:this.origen

        };
        if(this.dato){
          this.loadingState=true;
        }else{

        }


      });
  });
}


}
