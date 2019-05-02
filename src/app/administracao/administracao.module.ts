import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracaoRoutingModule } from './administracao-routing.module';
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent, 
    AdministracaoComponent, 
    AdmHomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministracaoRoutingModule
  ]
})
export class AdministracaoModule { }
