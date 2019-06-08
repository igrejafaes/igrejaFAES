import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imgFolder : string = '../../assets/images/';
  imgBackURL : string = 'url(' + this.imgFolder + 'fundoCarousel.jpg)';
  imagens : string[] = [];

  constructor(private service : CarouselService) { }
  
  ngOnInit() {
    this.getCarouselImages()
  }

  getCarouselImages(){
    this.service.getCarouselList().then((list) => {
      this.imagens = list.map((c) => { return c.imageURL })
    })
  }

}
