import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {egreso,ingreso} from 'src/app/theme/shared/models/egresosIn';
@Component({
  selector: 'app-arreglo-ingresos',
  templateUrl: './arreglo-ingresos.component.html',
  styleUrls: ['./arreglo-ingresos.component.scss']
})
export class ArregloIngresosComponent implements OnInit {
  @Input() tipo: any;
  @Input() dato: any;
  @Input() total: any;
  @Output() datoInput: EventEmitter<any> = new EventEmitter();
  list: any[] = [];
  constructor() {}
  data: any;
  objeto = {
    indice: 0,
    numero: 0
  };

  ngOnInit() {

    if (this.tipo == 'arreglo') {
      this.list = ingreso;
    } else {
      this.list = egreso;
    }
  }
  enviarDatos(indice: number) {
    this.objeto.indice = indice[0];
    this.datoInput.emit(this.objeto);
  }

}
