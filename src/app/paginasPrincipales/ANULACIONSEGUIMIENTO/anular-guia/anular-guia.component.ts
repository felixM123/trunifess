import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { RecepcionService } from 'src/app/theme/shared/services/recepcion.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-anular-guia',
  templateUrl: './anular-guia.component.html',
  styleUrls: ['./anular-guia.component.scss']
})
export class AnularGuiaComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  guia = {
    numero_guia: '',
    observacion: ''
  }
  anular1={
    numero_guia:'',
    agen_id:''
  }
  datos:any;
  type;
  token;
  id: any;
  cargando:boolean=true;
  constructor(private trackingService: AgenciaService,
              private recepcionService:RecepcionService,
              private msj:MensajesService,
              private crypto: CryptoService
              )
  {
          this.id = this.crypto.decodeData(localStorage.getItem('id'));
          this.type = this.crypto.decodeData(localStorage.getItem('type'));
          this.token = this.crypto.decodeData(localStorage.getItem('token'));
   }

  ngOnInit() {
    this.opciones();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  opciones() {
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
  buscar() {
    this.opciones();
    this.cargando=false;
    this.anular1.numero_guia=this.guia.numero_guia.toUpperCase();
    this.anular1.agen_id=this.id;
      this.trackingService.obtenerReporte(this.type, this.token,this.anular1).subscribe(res => {
         if(Object.keys(res).length === 0 == true){
            this.msj.mensajeAdvertencia('Advertencia','Sin transacciones registradas');
            this.datos=res;
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              // Destroy the table first
              dtInstance.destroy();
              // Call the dtTrigger to rerender again
              this.dtTrigger.next();
            });
            this.cargando=true;
         }else{
          this.datos=res;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
          this.cargando=true;
         }
      });
  }
  anular() {
    this.guia.numero_guia = this.guia.numero_guia.toUpperCase();
    this.recepcionService.reporteAnulacion(this.guia, this.type, this.token).subscribe(res => {
      if (Object.keys(res).length === 0 == true) {
        this.msj.mensajeError('Error', 'Error en anular')
      } else if (res['message']) {
        this.msj.mensajeCorrecto('Correcto', res['message']);
        this.datos = [];
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.guia.numero_guia='';
        this.guia.observacion='';
      }
    }, error => {
      this.msj.mensajeError('Error', 'Ocurrio un error vuelva a intentarlo.....')
    })
  }
  eliminar() {
    if (this.guia.observacion == '') {
      this.msj.mensajeAdvertencia('Advertencia', 'El campo observacion es obligatorio....!');
    } else {
      Swal({
        title: 'Advertencia',
        text: 'Esta seguro de anular esta guia!',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true
      }).then((willDelete) => {
        if (willDelete.value == true) {
          Swal('', 'Se elimino correctamente.....!', 'success');
          setTimeout(() => {
            this.anular();
          }, 1000);
        } else {
          Swal('', 'Se cancelo......!', 'error');
        }
      });
    }
  }

}
