import { Component, OnInit } from '@angular/core';
import { clReuniao } from '../../models/clReuniao';
import { ReuniaoService } from '../../services/reuniao.service';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrls: ['./reunioes.component.scss']
})
export class ReunioesComponent implements OnInit {

  reunioes: clReuniao[] = []
  bannerImage: string = '../../assets/images/bannerCentral.jpg'

  constructor(private reuniaoService: ReuniaoService) {
  }
  
  ngOnInit() {
    this.reunioes = this.reuniaoService.getReunioes()
  }


}
