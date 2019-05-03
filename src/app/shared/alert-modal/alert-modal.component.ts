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
  @Input() type: string = 'success';
  
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
