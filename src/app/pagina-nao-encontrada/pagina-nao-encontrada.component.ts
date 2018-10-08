import { Component } from '@angular/core';
//import { WOW } from 'wowjs/dist/wow.min';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent {

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }

}
