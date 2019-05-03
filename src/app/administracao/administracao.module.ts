import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from './../shared/shared.module';

import { AdministracaoRoutingModule } from './administracao-routing.module';
import { LoginComponent } from './login/login.component';
import { AdministracaoComponent } from './administracao.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarAdmComponent } from './navbar-adm/navbar-adm.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent, 
    AdministracaoComponent, 
    AdmHomeComponent, 
    NavbarAdmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    //SharedModule,
    ReactiveFormsModule,
    AdministracaoRoutingModule,
  ]
})
export class AdministracaoModule { }
