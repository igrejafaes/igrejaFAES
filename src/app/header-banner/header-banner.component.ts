import { Component, HostListener, OnInit } from '@angular/core';
//import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
//import { Observable } from 'rxjs';
//import { take } from 'rxjs/operators';
import returnWindowSize from '../shared/returnWindowSize'
import { GetImageUrlService } from './../services/get-image-url.service';

@Component({
  selector: 'app-header-banner',
  template: `
  <div *ngIf="loading" class="d-flex justify-content-center">
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <img *ngIf="!loading" [src]="bannerImage" alt="Logo FAES"/>
    `,
  styles: ['img {width: 100%; height: auto;}', 
           '.spinner-grow {width: 5rem; height: 5rem; margin: 10px 0;}']
})
export class HeaderBannerComponent implements OnInit {

  windowSize: string = '';
  bannerImage: string = '';
  loading: boolean = true;

  constructor(private getImage: GetImageUrlService) { }

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

  defineImgOrigem() {
    //var ref: AngularFireStorageReference
    var imageName: string
        
    if (this.windowSize === 'small') {
      imageName = 'BannerSuperior_peq.jpg'
      //ref = this.storage.ref('images/BannerSuperior_peq.jpg');
      //this.bannerImage = '../../assets/images/BannerSuperior_peq.jpg';
    } else {
      imageName = 'BannerSuperior.jpg'
      //ref = this.storage.ref('images/BannerSuperior.jpg');
      //this.bannerImage = '../../assets/images/BannerSuperior.jpg';
    }

    this.getImage.getImageURL(imageName, '')
      .subscribe((imageURL) => {
        this.bannerImage = imageURL;
        this.loading = false;
      })
      
    //let profileURL: Observable<string | null> = ref.getDownloadURL();

    // profileURL.subscribe((value)=>{
    //    this.bannerImage = value;
    // })

    // profileURL.pipe(take(1))
    //   .subscribe((imagem: string) => {
    //     this.bannerImage = imagem
    //   }, (error) => {console.log(error)})

  }

  @HostListener('window: resize') resize() {
    this.verificaWidth()
  }

}
