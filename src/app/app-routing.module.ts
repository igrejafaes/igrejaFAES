import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
//  { path: 'departamento', loadChildren: './departamento/departamento.module#DepartamentoModule' },
//  { path: 'igreja', loadChildren: './igreja/igreja.module#IgrejaModule' },
//  { path: 'home', loadChildren: './homepage/homepage.module#HomepageModule' },
//  { path: 'administracao', loadChildren: './administracao/administracao.module#AdministracaoModule' },
  { path: 'contato', component: ContatoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
