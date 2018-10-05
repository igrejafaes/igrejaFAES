import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderBannerComponent } from './header-banner/header-banner.component';
import { NavbarComponent } from './navbar/navbar.component'
import { HomepageModule } from './homepage/homepage.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { SharedModule } from './shared/shared.module';
import { RodapeComponent } from './rodape/rodape.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBannerComponent,
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomepageModule,
    AppRoutingModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
