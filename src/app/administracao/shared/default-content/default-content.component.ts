import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-content',
  templateUrl: './default-content.component.html',
  styleUrls: ['./default-content.component.scss']
})
export class DefaultContentComponent implements OnInit {

  @Input() titulo: string;
  @Input() subTitulo: string;
  @Input() buttonAddText: string;
  @Output() openAddModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitAddModal(){
    this.openAddModal.emit();
  }
}
