import { AgendaFormModalComponent } from './../agenda-form-modal/agenda-form-modal.component';
import { AgendaService } from './../../../services/agenda.service';
import { clAgenda } from './../../../models/clAgenda';
import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit {

  list: clAgenda[];
  modalRef: MDBModalRef;

  // ARRAY OF LIST HEAD ELEMENTS
  headElements = ['Título', 'Data', 'Descrição', ''];

  constructor(
    private agendaService: AgendaService,
    private modalService: MDBModalService,
    private alertModal: AlertModalService,
    private confirmModal: ConfirmModalService
  ) { }

  ngOnInit() {
    this.agendaService.getAgendaSnapshot().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        } as clAgenda;
      })
    });
  }

  openAddAgendaModal(){
    this.modalRef = this.modalService.show(AgendaFormModalComponent, this.modalConfig());

    this.modalRef.content.agendaDados.pipe(take(1)).subscribe((agendaDados: clAgenda) => {
      this.agendaService.addNewAgenda(agendaDados)
        .then((id) => {
          agendaDados.id = id;
          this.list.unshift(agendaDados);
          this.alertModal.showAlertSuccess('Evento salvo com sucesso', 'Sucesso');
        }, () => {
          this.alertModal.showAlertDanger('Não foi possível salvar o Evento', 'Tente depois');
        })
    });
  }

  onEdit(agenda: clAgenda){

  }

  onDelete(agenda: clAgenda){

  }

  // CONFIG MODAL OF USUARIO
  modalConfig(agenda?: clAgenda) {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      animated: true,
      //class: 'modal-notify modal-info modal-dialog-centered modal-md',
      class: 'modal-dialog modal-dialog-scrollable',
      data: {
        heading: agenda ? 'Editar Evento da Agenda' : 'Novo Evento da Agenda',
        agenda: agenda || new clAgenda
      }
    };
  };

}
