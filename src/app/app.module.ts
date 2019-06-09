import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from "angularfire2/auth";

//import { SharedModule } from './shared/shared.module';
//import { HomepageModule } from './homepage/homepage.module';
//import { DepartamentoModule } from './departamento/departamento.module';
import { AdministracaoModule } from './administracao/administracao.module';
import { UsuarioModule } from './administracao/usuarios/usuario.module';
//import { IgrejaModule } from './igreja/igreja.module';
import { NgwWowModule } from 'ngx-wow';

import { AppComponent } from './app.component';
//import { HeaderBannerComponent } from './header-banner/header-banner.component';
//import { NavbarComponent } from './navbar/navbar.component'
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { RodapeComponent } from './rodape/rodape.component';
//import { ContatoComponent } from './contato/contato.component';
//lOCALE PT-BR
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { PublicPageModule } from './public/public-page.module';
import { DepartamentoModule } from './departamento/departamento.module';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    //HeaderBannerComponent,
    //NavbarComponent,
    PaginaNaoEncontradaComponent,
    //RodapeComponent,
    //ContatoComponent,
    ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    //
    //SharedModule,
    //HomepageModule,
    //DepartamentoModule,
    //IgrejaModule,
    //
    NgwWowModule.forRoot(),
    UsuarioModule,
    AdministracaoModule,
    PublicPageModule,
    AppRoutingModule,
  ],
  entryComponents: [ ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
