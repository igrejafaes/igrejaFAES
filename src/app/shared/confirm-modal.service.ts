import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export enum confirmTypes {
  DANGER = 'danger',
  QUESTION = 'question',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  bsModalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) { }

  private showConfirm(
    title: string,
    iconType: confirmTypes,
    textOK?: string,
    textCancel?: string
  ): Subject<boolean> {
    // show confirm
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, this.defineModalConfig(title, iconType, textOK, textCancel));
    // return
    return this.bsModalRef.content.confirmation.pipe(take(1))
  }

  // MODAL CONFIG
  defineModalConfig(title: string, iconType: confirmTypes, textOK?: string, textCancel?: string) {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      animated: true,
      class: this.defineModalClass(iconType),
      data: {
        heading: title,
        iconType,
        textOK,
        textCancel
      }
    }
  }

  // MODAL CLASS CONFIG
  defineModalClass(iconType: confirmTypes): string {
    // define o modalClass icon string
    let modalClass: string = 'modal-sm modal-notify '
    switch (iconType) {
      case confirmTypes.DANGER:
        modalClass += 'modal-danger'
        break;
      case confirmTypes.QUESTION:
        modalClass += 'modal-question'
        break;
      case confirmTypes.WARNING:
        modalClass += 'modal-warning'
        break;
      default:
        break;
    }
    // return
    return modalClass
  }

  showConfirmDanger(title: string, textOK?: string, textCancel?: string): Subject<boolean> {
    return this.showConfirm(title, confirmTypes.DANGER, textOK, textCancel)
  }

  showConfirmSuccess(title: string, textOK?: string, textCancel?: string): Subject<boolean> {
    return this.showConfirm(title, confirmTypes.QUESTION, textOK, textCancel)
  }

  showConfirmWarning(title: string, textOK?: string, textCancel?: string): Subject<boolean> {
    return this.showConfirm(title, confirmTypes.WARNING, textOK, textCancel)
  }

}
