import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MulheresComponent } from './mulheres/mulheres.component';
import { JovensComponent } from './jovens/jovens.component';
import { AdolescentesComponent } from './adolescentes/adolescentes.component';
import { CriancasComponent } from './criancas/criancas.component';
import { DiretoriaComponent } from './diretoria/diretoria.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    MulheresComponent, 
    JovensComponent, 
    AdolescentesComponent, 
    CriancasComponent, 
    DiretoriaComponent
  ]
})
export class DepartamentoModule { }
