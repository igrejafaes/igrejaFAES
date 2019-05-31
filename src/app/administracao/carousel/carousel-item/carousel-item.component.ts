import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Carousel } from 'src/app/models/clCarousel';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() carousel: Carousel;
  @Input() editable = true;
  @Output() deleted = new EventEmitter<Carousel>();
  @Output() edited = new EventEmitter<Carousel>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    this.deleted.emit(this.carousel);
  }

  onEdit() {
    this.edited.emit(this.carousel);
  }

}
