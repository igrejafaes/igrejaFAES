import { Usuario } from '../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UserService } from '../user.service';

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
    const usuario: Usuario = {id: ID,
        ...this.route.snapshot.data['Usuario']};

    this.titulo = usuario.id ? 'Editar Usuário' : 'Criar Novo Usuário'
    this.createForm(usuario);
  }

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
        Validators.maxLength(20)
      ]],
      telefone: [usuario.telefone],
      wathsapp: [usuario.wathsapp],
      acesso: [usuario.acesso || 1]
    });
  }

  onSubmit() {
    this.submited = true

    if (this.userForm.valid){
      // get usuario pelo FORM
      let user: Usuario = this.userForm.value
      // define o acesso
      if(!user.acesso) user.acesso = 1

      if (!user.id) {
        this.userService.addNewUsuario(user)
        .then(
          (response) => console.log(response)
          )
      } else {
        this.alertModal.showAlertDanger('Em implementação', 'Implementando')
        setTimeout(() => {
          this.router.navigate(['usuario/lista'], { relativeTo: this.route.parent })
        }, 1000);
      }
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
