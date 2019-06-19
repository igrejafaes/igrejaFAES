import { Injectable }    from '@angular/core';
import { Usuario } from '../models/clUsuario';
 
@Injectable()
export class UsuarioLogadoService {
  private _usuarioLogado: Usuario;
 
  constructor() { }
 
  set usuarioLogado (user: Usuario) {
    this._usuarioLogado = user;
  }
 
  get usuarioLogado (): Usuario {
    return this._usuarioLogado;
  }
 
  clearUsuario() {
    this._usuarioLogado = null;
  }
 
}