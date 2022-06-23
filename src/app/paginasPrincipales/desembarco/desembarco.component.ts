import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisembarkationService } from 'src/app/theme/shared/services/disembarkation.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import * as wjcCore from "wijmo/wijmo";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-desembarco',
  templateUrl: './desembarco.component.html',
  styleUrls: ['./desembarco.component.scss']
})
export class DesembarcoComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  data: any = {
    tipo: 'DESEMBARCO',
    origen: '',
    destino: '',
    camion: '',
    chofer: '',
    transaccion: 0,
    fecha: '',
    embarco: [],
    total: 0,
    embarco_id: 0,
    hora:''
  }
  desmbarco:any={
    id_embarque:''
  }
  token;
  type;
  id;
  user;
  dataStore: any[] = [];
  rows = [];
  cantidad = 0;
  temp = [];
  valor: any;
  cargando: boolean = true;
  idD:any;
  reimprimir1={
    id_desembarco:''
  }
  embarco:any=[];
  total1:any;
  reimprimir={
    id:''
  }
  data1:any;
  suma:number=0;
  constructor(private modalService: NgbModal,
              private desembarcoService: DisembarkationService,
              private msj:MensajesService,
              private recepcionService:RecepcionService,
              private crypto: CryptoService)
  {
        this.token = this.crypto.decodeData(localStorage.getItem('token'));
        this.type = this.crypto.decodeData(localStorage.getItem('type'));
        this.id = this.crypto.decodeData(localStorage.getItem('id'));
        this.user = this.crypto.decodeData(localStorage.getItem('identity'));
  }

  ngOnInit() {
    this.opciones();
  }
  opciones(){
    this.dtOptions = {
     pagingType: 'full_numbers',
      pageLength: 8,
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
  ngAfterViewInit(): void {
    this.dtTrigger.next();


  }
  openModal(customContent) {

    this.modalService.open(customContent, { size: 'xl' as 'lg', centered: true, backdrop: 'static', windowClass: 'dark-modal' });
  }
  dataRecovery(event) {
    this.data.origen = event.origen;
    this.data.destino = event.destino;
    this.data.embarco_id = event.id;
    this.data.camion = event.camion;
    this.data.chofer = event.chofer;
    this.desmbarco.id_embarque=event.id;
    this.desembarcoService.listaEmbarques(this.type, this.token, this.desmbarco).subscribe(res => {

      this.dataStore = [];
      for (const item in res) {
        this.dataStore.push({
          guia: res[item]['numero_guia'],
          contenido: res[item]['contenido'],
          destino: event.destino,
          saldo: res[item]['saldo'],
          cantidad: res[item]['cantidad'],
          tipo: res[item]['tipo']
        });
      }
      this.total(this.dataStore);
      this.data.embarco = this.dataStore;
      this.rows = this.dataStore;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });

      this.cantidad = this.rows.length;
      for (let i = 0; i < this.rows.length; i++) {
        this.suma=this.suma+this.rows[i]['cantidad'];
    }
    })

    this.modalService.dismissAll();
  }
  total(embarques) {
    this.data.total = 0;
    for (const key in embarques) {
      this.data.total += parseFloat(embarques[key].cantidad);
    }
  }
  selectData(rowIndex) {
    this.suma=0;
    let arreglo = this.eliminar(rowIndex, this.rows);
    this.rows = arreglo;
    this.cantidad = this.rows.length;
    for (let i = 0; i < this.rows.length; i++) {
      this.suma=this.suma+this.rows[i]['cantidad'];
  }
  }
  eliminar(indice: any, arreglo: any) {
    this.temp = [...arreglo];
    this.temp.splice(indice, 1);
    return this.temp;
  }
  updateValue(event, rowIndex) {

    if (event.target.value > 0 && this.valor >= event.target.value) {
      this.rows[rowIndex]['cantidad'] = event.target.value;
      this.rows[rowIndex]['saldo'] = this.valor - event.target.value;
    } else {
      this.rows[rowIndex].saldo = this.valor;
    }
    this.rows = [...this.rows];

  }
  restaurarForm() {
    this.rows = [];
    this.data.embarco_id=0;
    this.data.origen='';
    this.data.destino='';
    this.cantidad=0;
  }
  realizarDesembarco(){
    this.cargando=false;
    if (this.rows.length > 0) {
      let data = [];
      for (const key in this.rows) {
        data.push({
          guia: this.rows[key]['guia'],
          contenido: this.rows[key]['contenido'],
          destino: this.id,
          saldo: this.rows[key]['saldo'],
          cantidad: this.rows[key]['cantidad']
        })
      }
      let embarco = {
        embarco_id: this.data.embarco_id,
        agen_id: this.id,
        usuario_id: this.user.id,
        embarcos: data
      }

      this.desembarcoService.realizarDesembarco(this.type, this.token, embarco).subscribe(res => {
        if (res['message'] == "success!") {
          this.idD=res['id'];
          this.msj.mensajeCorrecto('Correcto','El desembarque se realizo con exito');

            this.reimprimir1.id_desembarco=this.idD;
            this.recepcionService.reporteDetalleDesembarque(this.reimprimir1,this.type,this.token).subscribe(res=>{

              this.embarco=res;

              this.total1=this.cantidad;
              this.reimprimir.id=this.idD;
              this.recepcionService.reporteReimprecionDesembarque(this.reimprimir,this.type,this.token).subscribe(res=>{

                this.data1={
                  tipo: 'DESEMBARCO',
                  destino: res[0]['destino'],
                  origen: res[0]['origen'],
                  camion:res[0]['placa_camion'],
                  chofer: res[0]['chofer'],
                  usuario_id: res[0]['usuario'],
                  embarco: this.embarco,
                  transaccion: res[0]['numero'],
                  fecha: res[0]['fecha'],
                  total: this.total1,
                  hora:res[0]['hora'],
                  totalPaquetes:this.suma

                };
                setTimeout(() => {
                  this.printDocument();
              }, 1000);
              this.restaurarForm();
              })
              this.cargando=true;
            })


        } else {
          this.msj.mensajeError('Error','Ocurrio un error en el desembarque');
          this.restaurarForm();
          this.cargando=true;
        }
      })
    } else {
      this.msj.mensajeError('Error','No existen embarques para realizar el desembarque');
      this.cargando=true;

    }

  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice"));
    doc.print();
  }
}
