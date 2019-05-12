import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracaoModule } from '../administracao.module';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    UsuarioListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsuarioRoutingModule,
    AdministracaoModule,
  ]
})
export class UsuarioModule { }
