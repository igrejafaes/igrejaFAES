import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Usuario } from './../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  hide = true;
  usuario = new Usuario

  constructor(private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  tryLogin() {
    this.authService.doLogin(this.loginForm.value)
      .then(res => {
        console.log(res);
        this.router.navigate(['/administracao/home']);
      }, err => {
        console.log(err.message);
        this.errorMessage = err.message;
      })
  }

  onSubmit() {
    //this.submitted = true
    console.log(this.loginForm.valid)
    if (this.loginForm.valid) {
      this.tryLogin()
    }
  }

  // getErrorMessage(campo) {
  //   if (campo === this.loginForm.get('email')) {
  //     return campo.hasError('required') ? 'Entre com o e-mail' :
  //       campo.hasError('email') ? 'Entre com um Email válido' :
  //         '';
  //   } else if (campo === this.loginForm.get('password')) {
  //     return campo.hasError('required') ? 'Entre com a Senha' :
  //       campo.hasError('minlength') ? 'Entre com uma Senha válida' :
  //         '';
  //   }
  // }

  // hasError(field: string) {
  //   return this.loginForm.get(field).errors
  // }
}
