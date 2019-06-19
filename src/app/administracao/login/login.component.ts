import { UsuarioLogadoService } from './../usuarioLogado.service';
import { AlertModalService } from "src/app/shared/alert-modal.service";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./../auth.service";
import { loginErrorCodes } from 'src/app/shared/app-errors/login-errors';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted: boolean = false;
  //isLogged: boolean = false;

  constructor(
    private usuarioLogado: UsuarioLogadoService,
    private authService: AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alertModal: AlertModalService,
  ) {}

  ngOnInit() {

    //verifica se ja esta logado
    if (this.usuarioLogado.usuarioLogado){
      this.alertModal.showAlertInfo(['Você já está Logado...'], 'Logado');
      this.router.navigate(["/administracao/home"]);
    } else {
      this.authService.getCurrentAuthUser()
      .then((usuario)=>{
        this.alertModal.showAlertInfo([`Você já está Logado como ${usuario.nome}`], 'Logado');
        this.router.navigate(["/administracao/home"]);
      }, (error)=>{
        if (error.code) {
          if(error.code != loginErrorCodes.nenhum_usuario){
            this.alertModal.showAlertDanger([error.message], 'Login')
          }
        } else {
          console.log(error)
        }
      })
    }

    // criar o FormControl
    this.createForm();

  }

  // DELETE ANONYMOUS USER ON DESTROY COMPONENT
  ngOnDestroy(): void {
    if(this.usuarioLogado.usuarioLogado){
      //this.authService.doLogout()
    }
  }

  // DELETE ANONYMOUS USER BEFORE UNLOAD PAGE
  @HostListener('window:beforeunload')
    doLogout() {
      if(this.usuarioLogado.usuarioLogado){
        //this.authService.doLogout()
      }
    }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        'danielroliveira@gmail.com',
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
  tryLogin(usuario: string, password: string) {
    this.authService
      .doUsuarioLogin(usuario, password)
      .then(
        (usuario) => {
          this.alertModal.showAlertInfo(['Você está Logado!', `Seja bem-vindo ${usuario.nome}`], 'Logado');
          this.router.navigate(["/administracao/home"]);
        },
        (erro) => {

          if(erro.code) {

            if(erro.code === 'permissao_negada'){
              this.alertModal.showAlertDanger([`Acesso não permitido ao BD`, `Comunique-se com o administrador do sistema.`],'Login');
            } else if(erro.code === loginErrorCodes.usuario_senha_invalidos) {
              this.alertModal.showAlertDanger(["Senha ou usuário inválidos"], "Login");
            } else if(erro.code === loginErrorCodes.usuario_inativo) {
              this.alertModal.showAlertDanger([erro.message], "Login");
            } else if(erro.code === loginErrorCodes.usuario_incompleto) {
              this.alertModal.showAlertDanger([erro.message], "Login");
            } else {
              console.log(erro);
            }
          } else {
            console.log(erro)
          }

        }
      )
      .catch((erro) => {
        this.alertModal.showAlertDanger(
          ["Não foi possível conectar ao BD"],
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
