import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  heading: string = '';
  confirmation: Subject<boolean> = new Subject();
  iconType: string = 'danger';
  modalIcon: string = '';
  textOK: string = 'Sim';
  textCancel: string = 'Não';

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    switch (this.iconType) {
      case 'danger':
        this.modalIcon = 'fas fa-times'
        break;
      case 'question':
        this.modalIcon = 'far fa-question-circle'
        break;
      case 'warning':
        this.modalIcon = 'fa fa-exclamation-triangle'
        break;      
      default:
        break;
    }
  }

  onConfirmCancel(){
    this.modalRef.hide()
  }

  onConfirmOK() {
    this.confirmation.next(true);
    this.modalRef.hide();
  }

}
