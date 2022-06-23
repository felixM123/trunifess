import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/theme/shared/services/crypto.service';

@Component({
  selector: 'app-ifooter',
  templateUrl: './ifooter.component.html',
  styleUrls: ['./ifooter.component.scss']
})
export class IfooterComponent implements OnInit {
  user: any;
  constructor( private crypto: CryptoService) { }

  ngOnInit() {
    this.user = this.crypto.decodeData(localStorage.getItem('identity'));
  }

}
