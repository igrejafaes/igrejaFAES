import { Usuario } from '../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UserService } from '../user.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  userForm: FormGroup;
  submited: boolean = false;
  titulo: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private formbuilder: FormBuilder,
              private alertModal: AlertModalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // GET DATA FROM RESOLVE
    const ID =  this.route.snapshot.params['id'];
    const usuario: Usuario = {
      ...this.route.snapshot.data['Usuario'], 
      id: ID
    };
    this.titulo = usuario.id ? 'Editar Usuário' : 'Criar Novo Usuário';
    this.createForm(usuario);

    if(!usuario.id) {
      this.addConfirmControl()
    }
    
  }

  addConfirmControl(){
    const ctConfirm: AbstractControl = new FormControl('',[])
    this.userForm.addControl('confirm', ctConfirm)
    this.userForm.setValidators(this.mustMatch('password', 'confirm'))
  }

  // CRIAR O FORMULARIO
  createForm(usuario: Usuario) {

    this.userForm = this.formbuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      sobrenome: [usuario.sobrenome],
      email: [usuario.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      password: [usuario.password, [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(20),
      ]],
      telefone: [usuario.telefone],
      wathsapp: [usuario.wathsapp],
      acesso: [usuario.acesso || 1]
    });
  }

  // VALIDACAO DO CAMPO CONFIRMACAO PASSWORD
  // validatorFunc(): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} | null => {

  //     if(!this.userForm) return null;
  //     //if(this.userForm.value.ID === '') return null;

  //     const confirmValidated = (this.userForm.value.confirm === control.value)
  //     return confirmValidated ? null : {'confirmacao': {value: confirm}} 
  //   };
  // }

    // VALIDACAO DO CAMPO CONFIRMACAO PASSWORD
    mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
      return (): {[key: string]: any} | null => {

        const control = this.userForm.controls[controlName];
        const matchingControl = this.userForm.controls[matchingControlName];

        if(!this.userForm) return null;
        //if(this.userForm.value.ID === '') return null;
  
        const confirmValidated = (matchingControl.value === control.value)
        return confirmValidated ? null : {'mustMatch': {value: confirm}} 
      };
    }

  // VALIDACAO DO CAMPO CONFIRMACAO PASSWORD
  // validatorFunc(): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} | null => {

  //     //const control = userForm.controls[controlName];
  //     const matchingControl = this.userForm.controls['password'];

  //     if(!this.userForm) return null;

  //     if(this.userForm.value.ID === '') return null;

  //     const confirmacao = (control.value === this.userForm.value.password)
  //     return confirmacao ? null : {'confirmacao': {value: control.value}} 
  //   };
  // }

  // SUBMIT
  onSubmit() {
    this.submited = true
    
    if (this.userForm.valid){
      // get usuario pelo FORM
      let user: Usuario = this.userForm.value
      // define o acesso
      if(!user.acesso) user.acesso = 1

      if (!user.id) { // NEW USUARIO
        this.userService.addNewUsuario(user)
        .then(
          () => {
            this.alertModal.showAlertSuccess('Usuário criado com sucesso', 'Sucesso');
            this.router.navigate(['usuario/lista'], { relativeTo: this.route.parent });
          }
        )
      } else { // UPDATE USUARIO
        this.userService.updateUsuario(user)
          .then(() => {
            this.alertModal.showAlertSuccess('Usuário atualizado com sucesso', 'Sucesso');
            this.router.navigate(['usuario/lista'], { relativeTo: this.route.parent });
          }, () => {
            this.alertModal.showAlertDanger('Não foi possível atualizar usuário', 'Tente depois');
          })
      }
    }
  }

  //input(controle: string) { return this.userForm.get(controle); }

  hasError(field: string) {
    // verifica os erros do FormGroup
    const errors = this.userForm.get(field).errors
    if(errors != null){
      if (errors['required']) { return 'necessário preenchimento';}
      if (errors['email']) { return 'email inválido';}
      if (errors['maxlength']) { return `máximo de ${errors.maxlength.requiredLength} caracteres`;}
      if (errors['minlength']) { return `dever ter no mínimo ${errors.minlength.requiredLength} caracteres`;}
    } else {
      const formErr = this.userForm.errors
      if(formErr != null){
        if (formErr['mustMatch']) { return 'A senha e a confirmação precisam ser iguais...';}
      } else {
        return null;
      }
    }

  }

  voltar(){
    this.router.navigate(['administracao/usuario/lista'])
  }

}
