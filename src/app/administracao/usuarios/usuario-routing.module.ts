import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PaginaNaoEncontradaComponent } from 'src/app/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';

const routes: Routes = [
  {
    path: 'administracao/usuario', component: UsuarioComponent, children: [
      { path: '', redirectTo: 'lista', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'novo', component: UsuarioFormComponent, canActivate: [AuthGuard]},
      { path: 'lista', component: UsuarioListaComponent, canActivate: [AuthGuard]},
      { path: '**', component: PaginaNaoEncontradaComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
