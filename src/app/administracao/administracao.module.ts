import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { AdministracaoRoutingModule } from './administracao-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarAdmComponent } from './navbar-adm/navbar-adm.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// COMPONENTS
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsComponent } from './news/news.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { UsuarioLogadoService } from './usuarioLogado.service';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    LoginComponent, 
    AdministracaoComponent, 
    AdmHomeComponent, 
    NavbarAdmComponent, 
    CarouselComponent, 
    ScheduleComponent, 
    NewsComponent, 
    NewsletterComponent, CarouselItemComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    AdministracaoRoutingModule,
  ],
  exports: [
    NavbarAdmComponent
  ],
  providers: [ UsuarioLogadoService ]
})
export class AdministracaoModule { }
