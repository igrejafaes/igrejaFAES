import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from "angularfire2/auth";

import { PublicPageModule } from './public/public-page.module';
import { AdministracaoModule } from './administracao/administracao.module';
import { UsuarioModule } from './administracao/usuarios/usuario.module';
import { NgwWowModule } from 'ngx-wow';

import { AppComponent } from './app.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//lOCALE PT-BR
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    NgwWowModule,
    PublicPageModule,
    UsuarioModule,
    AdministracaoModule,
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
