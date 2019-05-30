import { Component, OnInit } from '@angular/core';
import { UsuarioLogadoService } from '../usuarioLogado.service';

@Component({
  selector: 'app-adm-home',
  templateUrl: './adm-home.component.html',
  styleUrls: ['./adm-home.component.scss']
})
export class AdmHomeComponent implements OnInit {

  logadoNome: string = ""

  constructor(private logado: UsuarioLogadoService) { }

  ngOnInit() {
    this.logadoNome = this.logado.usuarioLogado.nome
  }

}
