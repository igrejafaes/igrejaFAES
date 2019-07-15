import { OptionModalComponent } from './option-modal/option-modal.component';
import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionModalService {
  
  bsModalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) { }

  showOptions(title: string, optionItems: string[]): Subject<number> {
    // show confirm
    this.bsModalRef = this.modalService.show(
      OptionModalComponent, this.defineModalConfig(title, optionItems)
    );
    // return
    return this.bsModalRef.content.confirmation.pipe(take(1))
  }

  // MODAL CONFIG
  private defineModalConfig(title: string, optionItems: string[]) {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      animated: true,
      class: 'modal-sm modal-notify modal-info',
      data: {
        heading: title,
        optionItems,
      }
    }
  }

  
}
