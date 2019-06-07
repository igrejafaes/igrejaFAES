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
import { CarouselListComponent } from './carousel/carousel-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NewsComponent } from './news/news.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { UsuarioLogadoService } from './usuarioLogado.service';
import { CarouselItemComponent } from './carousel/carousel-item/carousel-item.component';
import { CarouselFormModalComponent } from './carousel/carousel-form-modal/carousel-form-modal.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    LoginComponent, 
    AdministracaoComponent, 
    AdmHomeComponent, 
    NavbarAdmComponent, 
    CarouselListComponent, 
    ScheduleComponent, 
    NewsComponent, 
    NewsletterComponent, 
    CarouselItemComponent, 
    CarouselFormModalComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    AdministracaoRoutingModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    NavbarAdmComponent
  ],
  entryComponents: [CarouselFormModalComponent],
  providers: [ UsuarioLogadoService ]
})
export class AdministracaoModule { }
