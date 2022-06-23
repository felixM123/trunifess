import { Component, OnInit, AfterViewInit,ViewChild, EventEmitter, Output } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { Agencia } from 'src/app/theme/shared/models/agencia';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryService } from 'src/app/theme/shared/services/delivery.service';
import { SearchGuide } from 'src/app/theme/shared/models/search_guides';
import { DecimalPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-search-guides',
  templateUrl: './search-guides.component.html',
  styleUrls: ['./search-guides.component.scss'],
  providers: [DecimalPipe]
})
export class SearchGuidesComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @Output() objectSelected = new EventEmitter<any>();
  yesterday: any;
  today: any;
  token;
  type;
  query: SearchGuide = {
    agen_id_origen: 0,
    fecha_del: '',
    fecha_al: '',
    criterio: '',
    estado: 0,
    agen_id: 0
  }
  selected = [];
  data: any[] = [];
  agencias: Agencia[];
  origen: number = 0;
  rows = [];
  temp = [];
  columns = [
    { prop: 'fecha' },
    { name: 'Origen' },
    { name: 'Guia' },
    { name: 'Remitente' },
    { name: 'Consignatario' },
    { name: 'Contenido' }
  ];
  id: any;
  mensaje: any;
  origen1: number;
  ms1: any;
  cargando: boolean = true;
  cancelar1: boolean = false;
  constructor(
    private agenciaService: AgenciaService,
    private calendar: NgbCalendar,
    private entregaservice: DeliveryService,
    private pipe: DecimalPipe,
    private modalService: NgbModal,
    private crypto: CryptoService
  ) {
    this.id = this.crypto.decodeData(localStorage.getItem('id'));
    this.token = this.crypto.decodeData(localStorage.getItem('token'));
    this.type = this.crypto.decodeData(localStorage.getItem('type'));
    this.today = this.calendar.getToday();
    this.yesterday = this.calendar.getPrev(this.calendar.getToday(), 'd', 30);
    this.origen1 = 0;
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
  obtenerAgencias() {
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res => {
      this.agencias = [];
      for (const item in res) {
        if (this.id != res[item].id) {
          this.agencias.push(res[item]);
        }
      }
    });
  }
  obtenerGuias() {
    this.cargando=false;
    if (this.origen1 > 0) {
      this.query.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
      this.query.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
      this.query.criterio = this.query.criterio.toUpperCase();
      this.query.agen_id_origen = this.origen1;
      this.query.agen_id = this.id;
      this.query.estado = 1;
      this.entregaservice.obtenerGuias(this.type, this.token, this.query).subscribe(res => {

        if ((Object.keys(res).length === 0) == true) {
          this.data = [];
          this.rows = this.data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
          this.cargando=true;
        } else {
          this.data = [];
          for (const item in res) {
            this.data.push({
              fecha: res[item]['fecha'],
              origen: res[item]['origen'],
              guia: res[item]['numero_guia'],
              remitente: res[item]['remitente'],
              consignatario: res[item]['consignatario'],
              contenido: res[item]['contenido'],
              destino: res[item]['destino']
            })
          }
          this.rows = this.data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
          this.cargando = true;
          this.cancelar1 = true;
        }
      })
    } else {
      this.ms1 = 'Seleccione un origen';
      this.cargando=true;
    }

  }
  selectData(selected) {
    this.objectSelected.emit(selected);
  }
  cancelar() {
    this.modalService.dismissAll();
  }
}
