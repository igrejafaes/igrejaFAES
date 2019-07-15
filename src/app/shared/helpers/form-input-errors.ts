import { FormGroup } from '@angular/forms';

export function FormInputErrors(field: string, form: FormGroup) : string {
  // verifica os erros do FormGroup
  const errors = form.get(field).errors;
  if (errors != null) {
    if (errors['required']) {
      return "necessário preenchimento";
    };
    if (errors['email']) {
      return "email inválido";
    };
    if (errors['maxlength']) {
      return `máximo de ${errors.maxlength.requiredLength} caracteres`;
    };
    if (errors['minlength']) {
      return `dever ter no mínimo ${errors.minlength.requiredLength} caracteres`;
    };
    return ''
  } else {
    return null
  }
}