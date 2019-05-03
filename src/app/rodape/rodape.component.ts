import { Component, OnInit } from '@angular/core';

import { clInfoIgreja } from '../models/clInfoIgreja';
import { InfoigrejaService } from '../services/infoigreja.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent implements OnInit {

  logoFAES = '/assets/images/LogoFAES_Branco.png'
  infoIgreja: clInfoIgreja
 
  constructor(private infoIgrejaService : InfoigrejaService) { }

  ngOnInit() {
    this.infoIgreja = this.infoIgrejaService.GetInfoIgreja()
  }

}
