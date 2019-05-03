import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum alertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: MDBModalService) { }

  private showAlert(message: string, title: string ,type: alertTypes, dismissTimeOut?: number){
    const bsModalRef : MDBModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    
    if(dismissTimeOut){
      setTimeout(() => {
        bsModalRef.hide()
      }, dismissTimeOut);
    }

  }

  showAlertDanger(message: string, title: string){
    this.showAlert(message, title, alertTypes.DANGER)
  }
  
  showAlertSuccess(message: string, title: string){
    this.showAlert(message, title, alertTypes.SUCCESS, 3000)
  }

}
