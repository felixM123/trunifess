import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { CamionService } from 'src/app/theme/shared/services/camion.service';
import { ChoferService } from 'src/app/theme/shared/services/chofer.service';
import { EmbarqueService } from 'src/app/theme/shared/services/embarque.service';
import { Agencia } from "src/app/theme/shared/models/agencia";
import { Camion } from "src/app/theme/shared/models/camion";
import { Chofer } from "src/app/theme/shared/models/chofer";
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import * as wjcCore from "wijmo/wijmo";
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-embarque',
  templateUrl: './embarque.component.html',
  styleUrls: ['./embarque.component.scss']
})
export class EmbarqueComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  agencias: Agencia[];
  camiones: Camion[];
  choferes: Chofer[];
  relevos: Chofer[];

  chofer_id = 0;
  camion_id = 0;
  relevo_id = 0;
  destino_id = 0;
  observaciones = '';


  user: any;
  id: number;
  type;
  token;
  dataStore: any[];
  rows = [];
  cantidad: number = 0;
  valor: any = 0;
  temp = [];
  cargando: boolean = true;
  idE: any;
  reimprimir = {
    id: ''
  }
  origen: any = {};
  data: any;
  suma: number = 0;
  constructor(private modalService: NgbModal,
    private agenciaService: AgenciaService,
    private camionService: CamionService,
    private choferService: ChoferService,
    private embarqueService: EmbarqueService,
    private msj: MensajesService,
    private recepcionService: RecepcionService,private crypto: CryptoService) {
    this.id = this.crypto.decodeData(localStorage.getItem("id"));
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.user = this.crypto.decodeData(localStorage.getItem("identity"));

  }

  ngOnInit() {
this.opciones();
    this.obtenerAgencias();
    this.obtenerCamiones();
    this.obtenerChoferes();

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
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

  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias.push(res[item]);
        }
        else {
          if (this.id == res[item].id) {
            this.origen = res[item]
          }
        }
      }
    });
  }
  obtenerCamiones() {
    this.camionService.buscarCamiones(this.type, this.token).subscribe(res => {
      this.camiones = [];
      for (const item in res) {
        this.camiones.push(res[item]);
      }
    });
  }
  obtenerChoferes() {
    this.choferService.buscarChofer(this.type, this.token).subscribe(res => {
      this.choferes = [];
      for (const item in res) {
        this.choferes.push(res[item]);
      }

    });
  }
  obtenerRelevo() {
    this.relevos = [];
    for (const chofer in this.choferes) {
      if (this.chofer_id > 0 && this.chofer_id != this.choferes[chofer]['id']) {
        this.relevos.push(this.choferes[chofer]);
      }
    }
  }
  dataRecovery(event) {
    this.dataStore = [];

    for (const data in event) {
      this.dataStore.push({
        guia: event[data]['numero_guia'],
        contenido: event[data]['contenido'],
        destino: event[data]['destino'],
        saldo: event[data]['saldo'],
        cantidad: event[data]['cantidad'],
        tipo: event[data]['tipo']
      });
    }
    this.rows = this.dataStore;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
    this.cantidad = this.rows.length;

    for (let i = 0; i < this.rows.length; i++) {
      this.suma = this.suma + this.rows[i]['cantidad'];
    }

    this.modalService.dismissAll();
  }
  openModal(customContent) {
    if (this.destino_id != 0) {
      this.modalService.open(customContent, {
        size: "xl" as "lg",
        centered: true,
        backdrop: "static",
        windowClass: "dark-modal"
      });
    } else {
      this.msj.mensajeError('Error', 'Seleccione una agencia')
    }
  }
  updateValue(event, rowIndex) {
    if (event.target.value > 0 && this.valor >= event.target.value) {
      this.rows[rowIndex]['saldo'] = event.target.value;
      this.rows[rowIndex]['saldo'] = this.valor - event.target.value;
    } else {
      this.rows[rowIndex].saldo = this.valor;
    }
    this.rows = [this.rows];
  }
  selectData(rowIndex) {
    this.suma = 0;
    let arreglo = this.eliminar(rowIndex, this.rows);
    this.rows = arreglo;
    this.cantidad = this.rows.length;
    for (let i = 0; i < this.rows.length; i++) {
      this.suma = this.suma + this.rows[i]['cantidad'];
    }
  }
  eliminar(indice: any, arreglo: any) {
    this.temp = [arreglo];
    this.temp.splice(indice, 1);
    return this.temp;
  }
  recepciones() {
    let data: any[] = [];
    for (let i = 0; i < this.rows.length; i++) {
      data.push({
        guia: this.rows[i]['guia'],
        contenido: this.rows[i]['contenido'],
        destino: this.destino_id,
        saldo: this.rows[i]['saldo'],
        cantidad: this.rows[i]['cantidad'],
        tipo: this.rows[i]['tipo'],
      })
    }
    return data;
  }
  restaurarForm() {
    this.rows = [];
    this.destino_id = 0;
    this.camion_id = 0;
    this.chofer_id = 0;
    this.relevo_id = 0;
    this.observaciones = '';
    this.cantidad = 0;
  }
  onSubmit() {
    this.cargando = false;
    if (this.rows.length > 0) {
      if (this.destino_id > 0 && this.camion_id > 0 && this.chofer_id > 0 && this.relevo_id > 0) {
        let embarco = {
          agencia_id: this.destino_id,
          camion_id: this.camion_id,
          chofer_id: this.chofer_id,
          relevo_id: this.relevo_id,
          observacion: this.observaciones,
          agen_id: this.id,
          usuario_id: this.user.id,
          recepciones: this.recepciones()
        }
        this.embarqueService.guardarEmbarque(this.type, this.token, embarco).subscribe(res => {

          if (res['message'] == "success!") {
            this.idE = res['id'];
            this.msj.mensajeCorrecto('Correcto', 'El embarque se realizo con exito')
            this.reimprimir.id = this.idE;
            this.recepcionService.reporteReimprecionEmbarque(this.reimprimir, this.type, this.token).subscribe(res => {

              this.data = {
                tipo: 'EMBARQUE',
                destino: res[0]['destino'],
                origen: this.origen,
                camion: res[0]['placa_camion'],
                chofer: res[0]['chofer'],
                usuario_id: res[0]['usuario'],
                embarco: embarco.recepciones,
                transaccion: res[0]['numero'],
                fecha: res[0]['fecha'],
                total: this.cantidad,
                hora: res[0]['hora'],
                totalPaquetes: this.suma
              };
              setTimeout(() => {
                this.printDocument();
              }, 1000);
              this.restaurarForm();
            })
            this.cargando = true;
          } else {
            this.msj.mensajeError('Error', 'Se produjo un error intente nuevamente')
            this.cargando = true;
            this.restaurarForm();
          }
        }, error => {
          this.msj.mensajeError('Error', 'Se produjo un error recargue la pagina....')
          this.cargando = true;
          this.restaurarForm();
        })
      } else {
        this.msj.mensajeAdvertencia('Advertencia', 'Llene los campos Camion o Chofer o Relevo');
        this.cargando = true;
        this.restaurarForm();
      }
    } else {
      this.msj.mensajeError('Error', 'No hay recepciones que embarcar');
      this.cargando = true;
      this.restaurarForm();
    }
  }
  printDocument() {
    var doc = new wjcCore.PrintDocument();
    doc.append(document.getElementById("invoice"));
    doc.print();
  }

}
