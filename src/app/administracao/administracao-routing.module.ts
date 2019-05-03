import { PaginaNaoEncontradaComponent } from './../pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: 'administracao', component: AdministracaoComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/administracao/home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'home', component: AdmHomeComponent , canActivate: [AuthGuard] },
    { path: '**', component: PaginaNaoEncontradaComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracaoRoutingModule { }
