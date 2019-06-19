import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum alertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  bsModalRef: MDBModalRef;
  
  constructor(private modalService: MDBModalService) { }
  
  private showAlert(message: string[], title: string, iconType: alertTypes, dismissTimeOut?: number){
    let modalClass: string = 'modal-side modal-top-right modal-notify '
    
    switch (iconType) {
      case alertTypes.DANGER:
        modalClass += 'modal-danger'
        break;
      case alertTypes.SUCCESS:
        modalClass += 'modal-success'
        break;
      case alertTypes.INFO:
        modalClass += 'modal-info'
        break;
      case alertTypes.WARNING:
        modalClass += 'modal-warning'
        break;         
      default:
        break;
    }

    this.bsModalRef = this.modalService.show(AlertModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: modalClass,
      containerClass: 'right',
      animated: true,
      data: {
        heading: 'Modal heading',
        iconType,
        content: { heading: 'Content heading', description: 'Content description'}
      }
    });

    this.bsModalRef.content.title = title;
    this.bsModalRef.content.message = message;
    
    if(dismissTimeOut){
      setTimeout(() => {
        this.bsModalRef.hide()
      }, dismissTimeOut);
    }

  }

  showAlertDanger(message: string[], title: string){
    this.showAlert(message, title, alertTypes.DANGER)
  }
  
  showAlertSuccess(message: string[], title: string){
    this.showAlert(message, title, alertTypes.SUCCESS, 3000)
  }

  showAlertInfo(message: string[], title: string){
    this.showAlert(message, title, alertTypes.INFO, 3000)
  }

  showAlertWarning(message: string[], title: string){
    this.showAlert(message, title, alertTypes.WARNING)
  }

}
