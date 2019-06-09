import { Component, OnInit } from '@angular/core';
import { clNoticia } from '../../../models/clNoticia';
import { NoticiaService } from '../../../services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias: clNoticia[] = []

  constructor(private noticiaService: NoticiaService ) { }

  ngOnInit() {
    this.noticias = this.noticiaService.getNoticias();
  };

  slideConfig = {
    // "centerMode": true,
    // "centerPadding": '60px',
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "autoplay": true,
    "cssEase": "ease",
    "dots": true,
    "dotsClass": "slick",
    "arrows": false,
    "focusOnSelect": false,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
}
