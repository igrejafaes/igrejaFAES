import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  imgFolder : string = '../../assets/images/';
  imgBackURL : string = 'url(' + this.imgFolder + 'fundoCarousel.jpg)';
  imagens : string[] = [];

  constructor() { }
  
  ngOnInit() {
    // deve criar um service
    this.imagens.push(this.imgFolder + 'bannerCar_1.jpg');
    this.imagens.push(this.imgFolder + 'bannerCar_2.jpg');
    this.imagens.push(this.imgFolder + 'bannerCar_3.jpg');
  }

}
