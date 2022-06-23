import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ChoferService } from 'src/app/theme/shared/services/chofer.service';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-lista-choferes',
  templateUrl: './lista-choferes.component.html',
  styleUrls: ['./lista-choferes.component.scss']
})
export class ListaChoferesComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  type: any;
  token: any;
  choferes: any;
  choferId={
    id:0,
  }
  id:number;
  constructor(private choferService:ChoferService,
              private router: Router,
              private msj:MensajesService,
              private crypto: CryptoService)
     {
      this.type = this.crypto.decodeData(localStorage.getItem("type"));
      this.token = this.crypto.decodeData(localStorage.getItem("token"));
     }

  ngOnInit() {
    this.opciones();
    this.listarChoferes();
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
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  listarChoferes() {
    this.opciones();
    this.choferService.obtenerChofere(this.type, this.token).subscribe(res => {
      if(Object.keys(res).length === 0 == true){
        this.choferes = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.msj.mensajeAdvertencia('Advertencia','Sin choferes.........!');
      }else{
        this.choferes = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }
    })
  }
  editar(id:number){
    this.router.navigate([`chofer/editar/${id}`]);
  }
  anular(id: number) {
    this.id=id;
      this.choferId.id=this.id;
    this.choferService.bloquearChofer(this.type, this.token, this.choferId).subscribe(res => {
      this.listarChoferes();
    })
  }
  eliminar(id:number) {
    Swal({
      title: 'Advertencia',
      text: 'Esta seguro de eliminar este chofer.....!',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value == true) {
        setTimeout(() => {
          this.anular(id);
        }, 1000);
        Swal('', 'Se elimino correctamente.....!', 'success');

      } else {
        Swal('', 'Se cancelo ......!', 'error');
      }
    });
  }
}
