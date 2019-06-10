import { AgendaService } from './../../../services/agenda.service';
import { clAgenda } from './../../../models/clAgenda';
import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit {

  list: clAgenda[];
  modalRef: MDBModalRef;

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

  // ARRAY OF LIST HEAD ELEMENTS
  headElements = ['Título', 'Data', 'Descrição', ''];

  openAddAgendaModal(){  }

  onEdit(agenda: clAgenda){

  }

  onDelete(agenda: clAgenda){

  }


}
