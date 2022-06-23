import { Component, Output,AfterViewInit, EventEmitter,ViewChild, Input, OnInit } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Subject } from 'rxjs';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { NgbCalendar,  } from '@ng-bootstrap/ng-bootstrap';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { DataTableDirective } from 'angular-datatables';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-search-recepcion',
  templateUrl: './search-recepcion.component.html',
  styleUrls: ['./search-recepcion.component.scss']
})
export class SearchRecepcionComponent implements AfterViewInit,OnInit{
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() agencia: any;
  @Output() objectSelected = new EventEmitter<any>();



  consulta: any = {
    agencia_id: 0,
    fecha_del: '',
    fecha_al: '',
    agen_id: 0
  }

  resepcion = {
    guia: '',
    contenido: '',
    destino: 0,
    saldo: '',
    cantidad: '',

  };
  destino: any;
  rows : any[];
  selected = [];
  objetos: any[] = [];
  id: number;
  type: any;
  token: any;
  today: any;
  yesterday: any;
  cantidad: number = 0;
  cargando: boolean = true;
  resR=[];
  constructor(
    private agenciaService: AgenciaService,
    private resepcionService: RecepcionService,
    private calendar: NgbCalendar,
    private msj: MensajesService,
    private crypto: CryptoService
  ) {
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday());
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
    this.id = this.crypto.decodeData(localStorage.getItem("id"));
  }
  ngOnInit() {
    this.opciones();
    this.obtenerAgencias();
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
  buscar() {
    this.opciones();
    this.cargando=false;
    this.consulta.agencia_id = this.destino.id;
    this.consulta.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
    this.consulta.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
    this.consulta.agen_id = this.id;
    this.resepcionService.buscarRecepcion(this.consulta, this.type, this.token).subscribe(res => {

      if (Object.keys(res).length === 0 == true) {

        this.rows = [];
        for (const key in res) {
          this.rows.push(res[key]);
        }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });

        this.cantidad = this.rows.length;
        this.cargando=true;
      } else {
        this.rows = [];
          for (const key in res) {
            this.rows.push(res[key]);
          }
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
          this.cantidad = this.rows.length;
          this.cargando=true;
      }
    })
  }
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      for (const item in res) {
        if (this.agencia == res[item].id) {
          this.destino = res[item];
        }
      }
    });
  }
  enviarObjetos() {
    if (this.rows.length > 0) {
      this.objectSelected.emit(this.rows);

    } else {
      this.msj.mensajeError('Error', 'No existen recepciones')
    }
  }
}
