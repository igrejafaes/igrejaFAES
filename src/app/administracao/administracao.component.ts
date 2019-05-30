import { AuthService } from './auth.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogadoService } from './usuarioLogado.service';
import { Usuario } from '../models/clUsuario';

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

  // DELETE ANONYMOUS USER BEFORE UNLOAD PAGE
  @HostListener('window:beforeunload')
  doSomething() {
    this.authService.doLogout()
  }

  fazerLogOut() {
    this.router.navigate(['/home']);
    this.authService.doLogout();
  }

}
