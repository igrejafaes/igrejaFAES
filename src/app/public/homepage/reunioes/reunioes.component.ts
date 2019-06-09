import { Component, OnInit } from '@angular/core';
import { clReuniao } from '../../../models/clReuniao';
import { ReuniaoService } from '../../../services/reuniao.service';

import { NgwWowService, NgwWowConfig } from 'ngx-wow';
import { Observable } from 'rxjs';
import { GetImageUrlService } from 'src/app/services/get-image-url.service';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.scss']
})
export class ReunioesComponent implements OnInit {

  reunioes: clReuniao[] = []
  //bannerImage: string = '../../assets/images/bannerCentral.jpg'
  bannerImage$: Observable<string | null>

  constructor(
    private reuniaoService: ReuniaoService, 
    private wowService: NgwWowService,
    private imageService: GetImageUrlService
  ) 
  {
    const WOW = new NgwWowConfig
    WOW.live = false
    WOW.mobile = true
    this.wowService.init(WOW);
  }
  
  ngOnInit() {
    this.bannerImage$ = this.imageService.getImageURL('bannerCentral.jpg', '')
    this.reunioes = this.reuniaoService.getReunioes()
  }


}
