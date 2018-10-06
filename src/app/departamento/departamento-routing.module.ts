import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartamentoComponent } from './departamento.component';
import { JovensComponent } from './jovens/jovens.component';
import { MulheresComponent } from './mulheres/mulheres.component';
import { AdolescentesComponent } from './adolescentes/adolescentes.component';
import { CriancasComponent } from './criancas/criancas.component';
import { DiretoriaComponent } from './diretoria/diretoria.component';
import { PaginaNaoEncontradaComponent } from '../pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'departamento', component: DepartamentoComponent, children: [
    { path: 'jovens', component: JovensComponent },
    { path: 'mulheres', component: MulheresComponent },
    { path: 'adolescentes', component: AdolescentesComponent },
    { path: 'criancas', component: CriancasComponent },
    { path: 'diretoria', component: DiretoriaComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PaginaNaoEncontradaComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
