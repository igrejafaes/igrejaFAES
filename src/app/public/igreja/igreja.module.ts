import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ConfissaoComponent } from './confissao/confissao.component';
import { HistoriaComponent } from './historia/historia.component';
import { OrganizacaoComponent } from './organizacao/organizacao.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ConfissaoComponent, 
    HistoriaComponent, 
    OrganizacaoComponent
  ]
})
export class IgrejaModule { }
