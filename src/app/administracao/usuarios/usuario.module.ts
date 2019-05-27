import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracaoModule } from '../administracao.module';
import { NgxMaskModule } from 'ngx-mask'

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';

@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdministracaoModule,
    NgxMaskModule.forRoot()
  ]
})
export class UsuarioModule { }
