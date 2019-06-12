import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html',
  styleUrls: ['./option-modal.component.scss']
})
export class OptionModalComponent implements OnInit {

  heading: string = '';
  confirmation: Subject<number> = new Subject();
  optionItems: string[];
  elements: any[];
  selectedItem: number;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.elements = this.optionItems.map((option, i)=>{
      return {index: i + 1, value: option}
    })
  }

  onConfirmCancel(){
    this.confirmation.next(null);
    this.modalRef.hide()
  }

  onConfirmOK() {
    this.confirmation.next(this.selectedItem);
    this.modalRef.hide();
  }

  headElements = ['Opção', ''];

  selectItem(i){
    this.selectedItem = i;
    this.onConfirmOK()
  }
}
