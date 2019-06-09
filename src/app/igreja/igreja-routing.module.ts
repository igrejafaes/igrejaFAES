import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IgrejaComponent } from './igreja.component';
import { ConfissaoComponent } from './confissao/confissao.component';
import { HistoriaComponent } from './historia/historia.component';
import { OrganizacaoComponent } from './organizacao/organizacao.component';
import { PaginaNaoEncontradaComponent } from '../pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'igreja', children: [
    { path: 'confissao', component: ConfissaoComponent },
    { path: 'historia', component: HistoriaComponent },
    { path: 'organizacao', component: OrganizacaoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PaginaNaoEncontradaComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IgrejaRoutingModule { }
