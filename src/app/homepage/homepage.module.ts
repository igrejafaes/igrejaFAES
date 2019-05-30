import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UsuarioModule } from '../administracao/usuarios/usuario.module';
import { HomepageRoutingModule } from './homepage-routing.module';

import { CarouselComponent } from './carousel/carousel.component';
import { HomepageComponent } from './homepage.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ReunioesComponent } from './reunioes/reunioes.component';
import { NoticiasComponent } from './noticias/noticias.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsuarioModule,
    HomepageRoutingModule,
  ],
  declarations: [
    CarouselComponent, 
    HomepageComponent, 
    AgendaComponent, 
    ReunioesComponent, 
    NoticiasComponent]
})
export class HomepageModule { }
