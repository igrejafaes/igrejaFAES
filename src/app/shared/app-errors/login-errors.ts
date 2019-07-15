// Se o status error for 404
export enum loginErrorCodes {
  usuario_inativo = 1,
  usuario_senha_invalidos = 2,
  nenhum_usuario = 3,
  permissao_negada = 4,
  usuario_incompleto = 5,
  inesperado = 100
}

export class LoginErros {
  
  message: string = ''
  code: loginErrorCodes

  constructor(errCode: loginErrorCodes) {
    this.code = errCode
    
    switch (errCode) {
      case loginErrorCodes.usuario_inativo:
        this.message = 'Usuário não está ativo. Comunique ao administrador.'
        break;
      case loginErrorCodes.usuario_senha_invalidos:
        this.message = 'Usuário ou Senha inválidos.'
        break;
      case loginErrorCodes.nenhum_usuario:
        this.message = 'Nenhum usuário Logado.'
        break;
      case loginErrorCodes.permissao_negada:
        this.message = 'Permissão de Acesso Negada BD.'
        break;
      case loginErrorCodes.usuario_incompleto:
          this.message = 'Necessita inserir os dados do usuário.'
          break;
      default:
        this.message = 'Erro inesperado ocorreu.'
        break;
    }
  }

}