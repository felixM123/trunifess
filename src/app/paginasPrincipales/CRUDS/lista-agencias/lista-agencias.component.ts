import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AgenciaService } from 'src/app/theme/shared/services/agencia.service';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-lista-agencias',
  templateUrl: './lista-agencias.component.html',
  styleUrls: ['./lista-agencias.component.scss']
})
export class ListaAgenciasComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private agenciaService:AgenciaService,private msj:MensajesService,
              private router: Router,private crypto: CryptoService)
  {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
   }
  agencias:any;
  type:any;
  token:any;
  ngOnInit() {
    this.opciones();
    this.listarAgencias();
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
  listarAgencias(){
    this.agenciaService.obtenerAgencias(this.type,this.token).subscribe(res=>{
      if(Object.keys(res).length === 0 == true){
        this.agencias=res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.msj.mensajeAdvertencia('Advertencia','Sin choferes.........!');
      }else{
        this.agencias=res;
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
    this.router.navigate([`agencia/editar/${id}`]);
  }

}
