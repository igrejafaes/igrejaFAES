import { Component,  HostListener, OnInit } from '@angular/core';
import  returnWindowSize from '../shared/returnWindowSize' 

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styles: ['img {width: 100%; height: auto;}']
})
export class HeaderBannerComponent implements OnInit {
  
  windowSize: string = ''
  bannerImage: string;
  
  constructor() {
  }
  
  ngOnInit(): void {
    this.verificaWidth()
  }

  verificaWidth() {

    let actualWindowSize = returnWindowSize(window.innerWidth)
    
    if (this.windowSize != actualWindowSize) {
      this.windowSize = actualWindowSize;
      this.defineImgOrigem()
    }

  }

  defineImgOrigem(){
    if (this.windowSize === 'small') {
      this.bannerImage = '../../assets/images/BannerSuperior_peq.jpg';
    } else {
      this.bannerImage = '../../assets/images/BannerSuperior.jpg';
      //this.bannerImage = 'https://firebasestorage.googleapis.com/v0/b/sitefaes.appspot.com/o/images%2FBannerSuperior.jpg?alt=media&token=bcf1565c-d9c7-48fa-bf0c-0e413032e2cc';
    }

  }

  @HostListener('window: resize') resize(){
    this.verificaWidth()
  }

}
