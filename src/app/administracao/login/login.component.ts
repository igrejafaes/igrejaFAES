import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Component, OnInit} from '@angular/core';
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
  usuario = new Usuario;
  submitted: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alertModal: AlertModalService) { }

  ngOnInit() {
    this.authService.usuarioChange$.subscribe((user) => {
      if (user != null) {
        this.alertModal.showAlertSuccess('Você já está logado como ' + user, 'Login');
        this.router.navigate(['/administracao/home']);
      }
    })
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [
        Validators.required, 
        Validators.email,
        Validators.minLength(3), 
        Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  tryLogin() {
    
    this.authService.doLogin(this.loginForm.value)
      .then(res => {
        //console.log(res);
        this.router.navigate(['/administracao/home']);
      }, err => {
        if(err.code === 'auth/user-not-found'){
          this.alertModal.showAlertDanger('Senha ou usuário inválido', 'Login')
        } else {
          this.alertModal.showAlertDanger('Um erro ocorreu, tente mais tarde...', 'Login')
        }
      })
  }

  onSubmit() {
    this.submitted = true
    //console.log(this.loginForm)
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
  //   if(this.submitted){
  //     //console.log(this.loginForm.get(field))
  //     return this.loginForm.get(field).errors
  //   }
  // }
}
