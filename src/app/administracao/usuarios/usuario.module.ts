import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracaoModule } from '../administracao.module';
import { NgxMaskModule } from 'ngx-mask'

import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioFormModalComponent } from './usuario-form-modal/usuario-form-modal.component';

@NgModule({
  declarations: [
    UsuarioListaComponent,
    UsuarioFormModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdministracaoModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [UsuarioFormModalComponent]
})
export class UsuarioModule { }
