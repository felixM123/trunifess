import { Component, OnInit, Input } from '@angular/core';
import { Agencia } from 'src/app/theme/shared/models/agencia';

@Component({
  selector: 'app-iheader',
  templateUrl: './iheader.component.html',
  styleUrls: ['./iheader.component.scss']
})
export class IheaderComponent implements OnInit {
@Input() datos: Agencia;
  constructor() { }

  ngOnInit() {
  }

}
