import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracaoRoutingModule } from './administracao-routing.module';
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';

@NgModule({
  declarations: [LoginComponent, AdministracaoComponent],
  imports: [
    CommonModule,
    AdministracaoRoutingModule
  ]
})
export class AdministracaoModule { }
