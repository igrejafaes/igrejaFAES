import { Component, OnInit } from '@angular/core';
import { clReuniao } from '../../models/clReuniao';
import { ReuniaoService } from '../../services/reuniao.service';

import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.scss']
})
export class ReunioesComponent implements OnInit {

  reunioes: clReuniao[] = []
  bannerImage: string = '../../assets/images/bannerCentral.jpg'

  constructor(private reuniaoService: ReuniaoService, private wowService: NgwWowService) {
    this.wowService.init();

  }
  
  ngOnInit() {
    this.reunioes = this.reuniaoService.getReunioes()
  }


}
