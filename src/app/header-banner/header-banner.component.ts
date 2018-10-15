import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import returnWindowSize from '../shared/returnWindowSize'

@Component({
  selector: 'app-header-banner',
  template: `<img [src]="bannerImage" alt="Logo FAES" />`,
  styles: ['img {width: 100%; height: auto;}']
})
export class HeaderBannerComponent implements OnInit {

  windowSize: string = '';
  bannerImage: string = '';

  constructor(private storage: AngularFireStorage) { }

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
    var ref: AngularFireStorageReference
    
    
    if (this.windowSize === 'small') {
      ref = this.storage.ref('images/BannerSuperior_peq.jpg');
      //this.bannerImage = '../../assets/images/BannerSuperior_peq.jpg';
    } else {
      ref = this.storage.ref('images/BannerSuperior.jpg');
      //this.bannerImage = '../../assets/images/BannerSuperior.jpg';
    }
    
    let profileURL: Observable<string | null> = ref.getDownloadURL();

    profileURL.subscribe((value)=>{
       this.bannerImage = value;
    })

    profileURL.pipe(take(1))
      .subscribe((imagem: string) => {
        this.bannerImage = imagem
      }, (error) => {console.log(error)})

  }

  @HostListener('window: resize') resize() {
    this.verificaWidth()
  }

}
