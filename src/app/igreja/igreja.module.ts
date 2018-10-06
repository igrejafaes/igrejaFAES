import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { IgrejaRoutingModule } from './igreja-routing.module';

import { IgrejaComponent } from './igreja.component';
import { ConfissaoComponent } from './confissao/confissao.component';
import { HistoriaComponent } from './historia/historia.component';
import { OrganizacaoComponent } from './organizacao/organizacao.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IgrejaRoutingModule
  ],
  declarations: [
    IgrejaComponent, 
    ConfissaoComponent, 
    HistoriaComponent, 
    OrganizacaoComponent
  ]
})
export class IgrejaModule { }
