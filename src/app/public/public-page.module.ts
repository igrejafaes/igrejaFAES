import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderBannerComponent } from 'src/app/header-banner/header-banner.component';
import { RodapeComponent } from 'src/app/rodape/rodape.component';
import { ContatoComponent } from 'src/app/contato/contato.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomepageModule } from 'src/app/homepage/homepage.module';
import { DepartamentoModule } from 'src/app/departamento/departamento.module';
import { IgrejaModule } from 'src/app/igreja/igreja.module';
import { PublicPageComponent } from './public-page.component';
import { PublicPageRoutingModule } from './public-page-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';

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
