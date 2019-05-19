import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolveGuard implements Resolve<Usuario> {

  constructor(private service: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    // return observable from object
    return of({
      nome: null,
      sobrenome: null,
      email: null,
      password: null,
      acesso: null,
      id: null,
      telefone: null,
      wathsapp: null
    })

  }
  
}
