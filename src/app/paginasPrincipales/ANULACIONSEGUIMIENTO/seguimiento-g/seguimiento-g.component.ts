import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import * as wjcCore from "wijmo/wijmo";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-seguimiento-g',
  templateUrl: './seguimiento-g.component.html',
  styleUrls: ['./seguimiento-g.component.scss']
})
export class SeguimientoGComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  guia = {
    numero_guia: ''
  }
  reimprimir1={
    id_embarque:''
  }
  reimprimir={
    id:''
  }
  reimprimir2={
    id_desembarco:''
  }
  agencias: any;
  id1:any;
  origen:any={};
  datos:any;
  data:any;
  type;
  token;
  mensaje:any;
  embarco:any=[];
  cantidad:any=0;
  total:any;
  suma: number = 0;
  constructor( private recepcionService:RecepcionService,
               private agenciaService: AgenciaService,
               private msj:MensajesService,
               private modalService: NgbModal,
               private crypto: CryptoService
              ) {
                this.type = this.crypto.decodeData(localStorage.getItem('type'));
                this.token = this.crypto.decodeData(localStorage.getItem('token'));
                this.id1 = this.crypto.decodeData(localStorage.getItem('id'));
               }

  ngOnInit() {
    this.obtenerAgenciasOrigen();
    this.opciones();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  opciones(){
    this.dtOptions = {
     pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        'search': 'Buscar',
        "emptyTable": "No hay información",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 a 0 de 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        'paginate': {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
    };
  }
  obtenerAgenciasOrigen() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id1 != res[item].id) {
          this.agencias.push(res[item]);
        }
        else {
          if (this.id1 == res[item].id) {
            this.origen = res[item]
          }
        }
      }
    });

  }
  buscar() {
    this.opciones();
    this.guia.numero_guia=this.guia.numero_guia.toUpperCase();
      this.agenciaService.obtenerReporte(this.type, this.token,this.guia).subscribe(res => {
         if(Object.keys(res).length === 0 == true){
              this.datos=res;
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
              });
              this.msj.mensajeAdvertencia('Advertencia','Sin transacciones registradas');
         }else{
          this.datos=res;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
         }
      });
  }
  ver(item,content){
    if(item.tipo_transaccion=='EMBARQUE'){
      this.reimprimir1.id_embarque=item.id;
      this.recepcionService.reporteDetalleEmbarque(this.reimprimir1,this.type,this.token).subscribe(res=>{
        this.embarco=res;
        this.cantidad=this.embarco.length;
      for (let i = 0; i < this.embarco.length; i++) {
        this.suma = this.suma + this.embarco[i]['cantidad'];
      }
        this.total=this.cantidad;
        this.reimprimir.id=item.id;
        this.recepcionService.reporteReimprecionEmbarque(this.reimprimir,this.type,this.token).subscribe(res=>{
          this.data={
            tipo: 'EMBARQUE',
            destino: res[0]['destino'],
            origen: this.origen,
            camion:res[0]['placa_camion'],
            chofer: res[0]['chofer'],
            usuario_id: res[0]['usuario'],
            embarco: this.embarco,
            transaccion: res[0]['numero'],
            fecha: res[0]['fecha'],
            total: this.total,
            hora:res[0]['hora'],
            totalPaquetes: this.suma,
          };
          setTimeout(() => {
            this.mensaje="reim"
            this.open(content);
          }, 2000);
        })
      })
      this.cantidad=0;
      this.mensaje="";
    }else if(item.tipo_transaccion=='DESEMBARCO'){
      this.reimprimir2.id_desembarco=item.id;
      this.recepcionService.reporteDetalleDesembarque(this.reimprimir2,this.type,this.token).subscribe(res=>{
        this.embarco=res;
        this.cantidad=this.embarco.length;
      for (let i = 0; i < this.embarco.length; i++) {
        this.suma = this.suma + this.embarco[i]['cantidad'];
      }
        this.total=this.cantidad;
        this.reimprimir.id=item.id;
        this.recepcionService.reporteReimprecionDesembarque(this.reimprimir,this.type,this.token).subscribe(res=>{
          this.data={
            tipo: 'DESEMBARCO',
            destino: res[0]['destino'],
            origen: res[0]['origen'],
            camion:res[0]['placa_camion'],
            chofer: res[0]['chofer'],
            usuario_id: res[0]['usuario'],
            embarco: this.embarco,
            transaccion: res[0]['numero'],
            fecha: res[0]['fecha'],
            total: this.total,
            hora:res[0]['hora'],
            totalPaquetes: this.suma,
          };
          setTimeout(() => {
            this.mensaje="reim"
            this.open(content);
          }, 2000);
        })
      })
      this.cantidad=0;
      this.mensaje="";
    }else if(item.tipo_transaccion=='ENTREGA'){
      this.reimprimir.id = item.id;
      this.recepcionService.reporteReimprecionEntrega(this.reimprimir, this.type, this.token).subscribe(res => {
        this.data={
          cambio:res[0]['cambio'],
          cantidad:parseInt(res[0]['piezas']),
          ci:res[0]['ci_consignatario'],
          consignatario:res[0]['consignatario'],
          contenido:res[0]['descripcion'],
          destino:res[0]['id_agencia_destino'],
          efectivo:res[0]['pagado'],
          fecha:res[0]['fecha'],
          guia:res[0]['guia'],
          hora:res[0]['hora'],
          nombres:res[0]['nombre_consignatario'],
          observacion:res[0]['observacion'],
          origen:res[0]['origen'],
          peso:parseInt(res[0]['peso']),
          precio_unitario:(res[0]['monto']/res[0]['piezas']).toFixed(2),
          remitente:res[0]['remitente'],
          telefono:res[0]['telefono'],
          usuario:res[0]['usuario'],
          tipo:res[0]['tipo'],
          consignatario1:res[0]['nombre_consignatario'],
          total:res[0]['monto'],

        };
        setTimeout(() => {
          this.mensaje="reimE"
          this.open(content);
        }, 2000);
      });
      this.mensaje="";
    }
  }
  open(content) {
    const modalRef = this.modalService.open(content, {
      size: "lg", centered: true, backdrop: "static", windowClass: "dark-modal"
    });
    // modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "Ok") {
      };
    }, (reason) => {
    });
  }
}
