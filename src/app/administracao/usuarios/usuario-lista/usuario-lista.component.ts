import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from 'src/app/models/clUsuario';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { UsuarioFormModalComponent } from '../usuario-form-modal/usuario-form-modal.component';
import { take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from './../../../shared/confirm-modal.service';
@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

  list: Usuario[];
  modalRef: MDBModalRef;

  constructor(
    private userService: UserService,
    private modalService: MDBModalService,
    private alertModal: AlertModalService,
    private confirmModal: ConfirmModalService
  ) { }

  ngOnInit() {
    this.userService.getUsuarios().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        } as Usuario;
      })
    });
  }

  // ARRAY OF LIST HEAD ELEMENTS
  headElements = ['Nome', 'Email', 'Telefone', 'Wathsapp', ''];

  // CONFIG MODAL OF USUARIO
  modalConfig(usuario?: Usuario) {
    return{
      class: 'modal-notify modal-info modal-dialog-centered modal-lg',
      containerClass: 'modal-dialog-scrollable',
      data: {
        heading: usuario ? 'Editar Usuário' : 'Inserir Usuário',
        usuario: usuario || new Usuario
      }
    };
  };

  onEdit(usuario: Usuario) {
    this.openEditUsuarioModal(usuario)
  }

  openEditUsuarioModal(usuario: Usuario) {
    const UsuarioCopy = {...usuario };

    this.modalRef = this.modalService.show(UsuarioFormModalComponent, this.modalConfig(UsuarioCopy));

    this.modalRef.content.usuarioData.pipe(take(1)).subscribe( (usuarioData: Usuario) => {
      this.userService.updateUsuario(usuarioData)
      .then(() => {
        const i = this.list.findIndex((u) => u.id === usuarioData.id)
        this.list[i] = usuarioData
        this.alertModal.showAlertSuccess(['Usuário atualizado com sucesso'], 'Sucesso');
      }, () => {
        this.alertModal.showAlertDanger(['Não foi possível atualizar usuário'], 'Tente depois');
      })
    });
  }

  openAddUsuarioModal(){
    this.modalRef = this.modalService.show(UsuarioFormModalComponent, this.modalConfig());

    this.modalRef.content.usuarioData.pipe(take(1)).subscribe( (usuarioData: Usuario) => {
      this.userService.addNewUsuario(usuarioData)
      .then((id) => {
        usuarioData.id = id;
        this.list.unshift(usuarioData);
        this.alertModal.showAlertSuccess(['Usuário salvo com sucesso'], 'Sucesso');
      }, () => {
        this.alertModal.showAlertDanger(['Não foi possível salvar o usuário'], 'Tente depois');
      })
    });

  }

  onDelete(usuario: Usuario){
    this.confirmModal.showConfirmDanger('Excluir: Você tem certeza?', 'Sim', 'Não')
      .subscribe((confirmation: boolean) => {
        if(confirmation) {
          this.userService.deleteUsuaruiByID(usuario.id).then(() => {
            const i = this.list.findIndex((u) => u.id === usuario.id);
            this.list.splice(i, 1)
          })
      }
    })
  }

}
