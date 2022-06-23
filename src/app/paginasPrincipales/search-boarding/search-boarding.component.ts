import { Component, Output,AfterViewInit,ViewChild, EventEmitter, OnInit } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { SearchBoarding } from 'src/app/theme/shared/models/search_boarding';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisembarkationService } from 'src/app/theme/shared/services/disembarkation.service';
import { DecimalPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
    selector: 'app-search-boarding',
    templateUrl: './search-boarding.component.html',
    styleUrls: ['./search-boarding.component.scss'],
    providers:[DecimalPipe]
})
export class SearchBoardingComponent implements  AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
    @Output() objectSelected = new EventEmitter<any>();
    query: SearchBoarding = {
        agencia_id: 0,
        fecha_del: '',
        fecha_al: '',
        agen_id: 0
    }
    yesterday: any;
    today: any;
    criterio: string;
    token: string;
    type: string;
    rows = [];
    seleccionado = 0;
    cantidad = 0;
    temp = [];
    mensaje:any;
    embarco = {
        id: 0,
        origen: '',
        destino: '',
        chofer: '',
        camion: ''
    };
    agencias: any[];
    destino: string;
    cargando: boolean = true;
    cancelar1: boolean = false;
    ms1:string;
    constructor(
        private agenciaService: AgenciaService,
        private calendar: NgbCalendar,
        private desembarcoService: DisembarkationService,
        private pipe:DecimalPipe,
        private modalService: NgbModal,
        private crypto: CryptoService
    ) {
        this.today = this.calendar.getToday();
        this.yesterday = this.calendar.getPrev(this.calendar.getToday());
        this.token = this.crypto.decodeData(localStorage.getItem('token'));
        this.type = this.crypto.decodeData(localStorage.getItem('type'));
    }
    ngOnInit() {
      this.opciones();
        this.query.agen_id = this.crypto.decodeData(localStorage.getItem('id'));
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
                if (this.query.agen_id != res[item].id) {
                    this.agencias.push(res[item]);
                } else {
                    this.destino = res[item]['nombre'];
                }
            }
        });
    }
    obtenerDatos() {
      this.opciones();
      this.ms1=''
      this.cargando = false;
        this.query.fecha_al = `${this.today.year}-${this.today.month}-${this.today.day}`;
        this.query.fecha_del = `${this.yesterday.year}-${this.yesterday.month}-${this.yesterday.day}`;
        if (this.query.agencia_id > 0) {
            this.desembarcoService.obtenerEmbarcos(this.type, this.token, this.query).subscribe(res => {

                if(Object.keys(res).length === 0 == true){
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
                this.ms1="Sin embarcos encontrados"

                this.cantidad = this.rows.length;
                this.cargando = true;
            }else{
                this.rows = [];
                setTimeout(() => {
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

              }, 1000);
              this.cargando = true;
              this.cancelar1 = true;
            }
            })
        } else {
            this.ms1="Seleccione una agencia";
            this.cargando = true;
        }
    }
    selectData(selected) {
        this.embarco = {
            id: selected.id,
            origen: selected.origen,
            destino: this.destino,
            chofer: selected.chofer,
            camion: selected.camion
        };
        this.seleccionado = 1;
    }
    enviarObjetos() {
        if (this.embarco.id > 0) {
            this.objectSelected.emit(this.embarco);
        } else {

            this.ms1='Seleccione un embarque';

        }

    }
    cancelar() {
      this.modalService.dismissAll();
    }

}
