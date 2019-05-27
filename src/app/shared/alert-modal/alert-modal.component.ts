import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() message: string;
  @Input() title: string = 'FAES';
  //@Input() iconType: string;
  iconType: string;

  modalIcon: string = '';
  
  constructor(public modalRef: MDBModalRef) {
  }

  ngOnInit() {
    console.log(this.iconType)
    switch (this.iconType) {
      case 'danger':
        this.modalIcon = 'fa fa-times-circle'
        break;
      case 'success':
        this.modalIcon = 'fas fa-check'
        break;
      case 'info':
        this.modalIcon = 'fa fa-info'
        break;
      case 'warning':
        this.modalIcon = 'fa fa-exclamation-triangle'
        break;      
      default:
        break;
    }
  }

  alertClose(){
    this.modalRef.hide()
  }

}
