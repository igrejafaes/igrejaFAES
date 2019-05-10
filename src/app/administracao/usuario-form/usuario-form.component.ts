import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  userForm: FormGroup;
  submited:boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formbuilder: FormBuilder,
              private alertModal: AlertModalService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.formbuilder.group({
      nome: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      sobrenome: [null],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      password: [null, [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(20)
      ]],
      telefone: [null],
      wathsapp: [null],
    });
  }

  onSubmit() {
    this.submited = true

    if (this.userForm.valid){
      let user: Usuario = this.userForm.value

      this.authService.createNewUser(user)
      .then(
        (response) => console.log(response)
      )
    }

  }

  input(controle: string) { return this.userForm.get(controle); }

  hasError(field: string) {

    const errors = this.userForm.get(field).errors

    if(errors != null){
      if (errors['required']) { return 'necessário preenchimento';}
      if (errors['email']) { return 'email inválido';}
      if (errors['maxlength']) { return `máximo de ${errors.maxlength.requiredLength} caracteres`;}
      if (errors['minlength']) { return `dever ter no mínimo ${errors.minlength.requiredLength} caracteres`;}
    } else {
      return null;
    }
  }
}
