import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-em-construcao',
  templateUrl: './em-construcao.component.html',
  styleUrls: ['./em-construcao.component.scss']
})
export class EmConstrucaoComponent {

  @Input() PaginaTitulo: string;

}
