import { AlertModalService } from "src/app/shared/alert-modal.service";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./../auth.service";
import { Usuario } from "./../../models/usuario";
import { UsuarioLogadoService } from "../usuarioLogado.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted: boolean = false;
  isLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alertModal: AlertModalService,
  ) {}

  ngOnInit() {
    //verifica se ja esta logado
    this.authService.isAnonymouslyLogged()
    .then((resp) => {
      if(!resp){
        this.authService.doAnonymousLogin(); 
      }
    })
    this.isLogged = true;
    // criar o FormControl
    this.createForm();
  }

  // DELETE ANONYMOUS USER ON DESTROY COMPONENT
  ngOnDestroy(): void {
    if(!this.isLogged){
      this.authService.doLogout()
    }
  }

  // DELETE ANONYMOUS USER BEFORE UNLOAD PAGE
  @HostListener('window:beforeunload')
  doSomething() {
    if(this.isLogged){
      this.authService.doLogout()
    }
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        'Daniel',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      password: [
        '123456',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
    });
  }

  // TRY USUARIO LOGIN WITH ANONYMOUS USER
  tryLogin(usuario: string, passowrd: string) {
    this.authService
      .doUserLogin(usuario, passowrd)
      .then(
        () => {
          this.router.navigate(["/administracao/home"]);
        },
        () => {
          this.alertModal.showAlertDanger("Senha ou usuário inválido", "Login");
        }
      )
      .catch(() => {
        this.alertModal.showAlertDanger(
          "Não foi possível conectar ao BD",
          "Login"
        );
      });
  }

  onSubmit() {
    this.submitted = true;

    // verifica validade do form
    if (!this.loginForm.valid) return;

    // tenta fazer o login
    this.tryLogin(this.loginForm.value.email, this.loginForm.value.password);
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
