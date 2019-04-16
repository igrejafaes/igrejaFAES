import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';

const routes: Routes = [
  { path: 'administracao', component: AdministracaoComponent, children: [
    { path: 'login', component: LoginComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracaoRoutingModule { }
