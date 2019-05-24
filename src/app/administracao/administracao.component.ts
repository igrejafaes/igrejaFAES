import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogadoService } from './usuarioLogado.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.scss']
})
export class AdministracaoComponent implements OnInit {

  loggedUsuario: Usuario

  constructor(private authService: AuthService,
              private usuarioLogado: UsuarioLogadoService,
              private router: Router) { }

  ngOnInit() {  }

  fazerLogOut() {
    //this.subscriptions.unsubscribe;
    this.router.navigate(['/home']);
    this.authService.doLogout();
  }

}
