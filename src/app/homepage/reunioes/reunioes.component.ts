import { Component, OnInit } from '@angular/core';
import { clReuniao } from '../../models/clReuniao';
import { ReuniaoService } from '../../services/reuniao.service';

import { NgwWowService, NgwWowConfig } from 'ngx-wow';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.scss']
})
export class ReunioesComponent implements OnInit {

  reunioes: clReuniao[] = []
  bannerImage: string = '../../assets/images/bannerCentral.jpg'

  constructor(
    private reuniaoService: ReuniaoService, 
    private wowService: NgwWowService
  ) 
  {
    const WOW = new NgwWowConfig
    WOW.live = false
    WOW.mobile = true
    this.wowService.init(WOW);
  }
  
  ngOnInit() {
    this.reunioes = this.reuniaoService.getReunioes()
  }


}
