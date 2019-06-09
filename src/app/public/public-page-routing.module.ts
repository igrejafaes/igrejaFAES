import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoComponent } from 'src/app/public/contato/contato.component';
import { PaginaNaoEncontradaComponent } from 'src/app/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicPageComponent } from './public-page.component';
import { JovensComponent } from './departamento/jovens/jovens.component';
import { MulheresComponent } from './departamento/mulheres/mulheres.component';
import { AdolescentesComponent } from './departamento/adolescentes/adolescentes.component';
import { CriancasComponent } from './departamento/criancas/criancas.component';
import { DiretoriaComponent } from './departamento/diretoria/diretoria.component';
import { ConfissaoComponent } from './igreja/confissao/confissao.component';
import { HistoriaComponent } from './igreja/historia/historia.component';
import { OrganizacaoComponent } from './igreja/organizacao/organizacao.component';

const routes: Routes = [
  {
    path: '', component: PublicPageComponent,
    children: [
      { path: 'home', component: HomepageComponent },
      { path: 'departamento', children: [
        { path: 'jovens', component: JovensComponent },
        { path: 'mulheres', component: MulheresComponent },
        { path: 'adolescentes', component: AdolescentesComponent },
        { path: 'criancas', component: CriancasComponent },
        { path: 'diretoria', component: DiretoriaComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: '**', component: PaginaNaoEncontradaComponent }
      ] },
      { path: 'igreja', children: [
        { path: 'confissao', component: ConfissaoComponent },
        { path: 'historia', component: HistoriaComponent },
        { path: 'organizacao', component: OrganizacaoComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: '**', component: PaginaNaoEncontradaComponent }
      ] },
      { path: 'contato', component: ContatoComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPageRoutingModule { }
