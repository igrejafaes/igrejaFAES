import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { UsuarioLogadoService } from '../usuarioLogado.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userLogadoService: UsuarioLogadoService
    ) { }
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

        if (this.userLogadoService.usuarioLogado ) {
          return true
        } else {
          this.router.navigate(['/administracao/login'])
          return false
        }

    }

}
