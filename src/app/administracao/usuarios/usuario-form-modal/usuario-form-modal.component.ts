import { Component, OnInit  } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Usuario } from 'src/app/models/clUsuario';
import { Subject } from 'rxjs';
import { FormInputErrors } from 'src/app/shared/helpers/form-input-errors';

@Component({
  selector: 'app-usuario-form-modal',
  templateUrl: './usuario-form-modal.component.html',
  styleUrls: ['./usuario-form-modal.component.scss']
})
export class UsuarioFormModalComponent implements OnInit {

  heading: string;
  userForm: FormGroup;
  submited: boolean = false;
  usuarioData: Subject<Usuario> = new Subject();
  usuario: Usuario = new Usuario();

  constructor(
    public modalRef: MDBModalRef,
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm(this.usuario);

    if(!this.usuario.id) {
      this.addConfirmControl()
    }
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

  addConfirmControl(){
    const ctConfirm: AbstractControl = new FormControl('',[])
    this.userForm.addControl('confirm', ctConfirm)
    this.userForm.setValidators(this.mustMatch('password', 'confirm'))
  }

  // VALIDACAO DO CAMPO CONFIRMACAO PASSWORD
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (): {[key: string]: any} | null => {

      const control = this.userForm.controls[controlName];
      const matchingControl = this.userForm.controls[matchingControlName];

      if(!this.userForm) return null;

      const confirmValidated = (matchingControl.value === control.value)
      return confirmValidated ? null : {'mustMatch': {value: confirm}} 
    };
  }

  onSave() {
    this.submited = true

    if (this.userForm.valid) {
      
      let clearUsuario = { ...this.userForm.value }
      if(!clearUsuario.acesso) this.userForm.value.acesso = 1;
      delete clearUsuario.confirm

      this.usuarioData.next(clearUsuario);
	    this.modalRef.hide();
    } else {
      const controls = this.userForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

  hasError(field: string) : string {
    // verifica os erros do FormGroup
    const erro = FormInputErrors(field, this.userForm)

    if(!erro){
      return erro
    } else{
      const formErr = this.userForm.errors
      if(formErr != null){
        if (formErr['mustMatch']) { return 'A senha e a confirmação precisam ser iguais...';}
      } else {
        return null;
      }
    }
  }
  
}

