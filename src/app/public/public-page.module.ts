import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderBannerComponent } from 'src/app/public/header-banner/header-banner.component';
import { RodapeComponent } from 'src/app/public/rodape/rodape.component';
import { ContatoComponent } from 'src/app/public/contato/contato.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomepageModule } from 'src/app/public/homepage/homepage.module';
import { DepartamentoModule } from 'src/app/public/departamento/departamento.module';
import { IgrejaModule } from 'src/app/public/igreja/igreja.module';
import { PublicPageComponent } from './public-page.component';
import { PublicPageRoutingModule } from './public-page-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HeaderBannerComponent,
    NavbarComponent,
    RodapeComponent,
    ContatoComponent,
    PublicPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicPageRoutingModule,
    HomepageModule,
    DepartamentoModule,
    IgrejaModule,
  ]
})
export class PublicPageModule { }
