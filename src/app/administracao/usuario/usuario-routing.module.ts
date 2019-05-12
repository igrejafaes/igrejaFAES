import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PaginaNaoEncontradaComponent } from 'src/app/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: 'administracao/usuario', component: UsuarioComponent, children: [
      { path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: 'novo', component: UsuarioFormComponent, canActivate: [AuthGuard]},
      { path: '**', component: PaginaNaoEncontradaComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
