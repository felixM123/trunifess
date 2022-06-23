import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/theme/shared/services/usuario.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MensajesService } from 'src/app/theme/shared/services/mensajes.service';
import Swal from 'sweetalert2';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';
@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements AfterViewInit,OnInit {
  @ViewChild(DataTableDirective, {})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  usuarios: any;
  type: any;
  token: any;
  userId = {
    id: 0,
  }
  id: number;
  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private msj:MensajesService,
              private crypto: CryptoService
              )
  {
    this.type = this.crypto.decodeData(localStorage.getItem("type"));
    this.token = this.crypto.decodeData(localStorage.getItem("token"));
   }
  ngOnInit() {
    this.opciones();
    this.listarUsuarios();
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
  listarUsuarios() {
    this.opciones();
    this.usuarioService.obtenerUsuario(this.type, this.token).subscribe(res => {
      if(Object.keys(res).length === 0 == true){
        this.usuarios = res;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
        this.msj.mensajeAdvertencia('Advertencia','Sin usuarios.........!');
      }else{
        this.usuarios = res;
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
    this.router.navigate([`usuarios/editar/${id}`]);
  }
  anular(id: number) {
    this.id = id;
    this.userId.id = this.id;
    this.usuarioService.bloquearUsuario(this.type, this.token, this.userId).subscribe(res => {
      this.listarUsuarios();
    })
  }
  eliminar(id:number) {
      Swal({
        title: 'Advertencia',
        text: 'Esta seguro de eliminar este usuario.....!',
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
