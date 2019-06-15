import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../models/clNoticia';
import { NoticiaService } from '../../../services/noticia.service';
import { AppError } from 'src/app/shared/app-errors/app-error';
import { NotFoundError } from 'src/app/shared/app-errors/not-found-error';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticias: Noticia[] = []

  constructor(private noticiaService: NoticiaService ) { }

  ngOnInit() {
    this.noticiaService.getNoticiasSnapshot().subscribe(actionArray => {
      this.noticias = actionArray.map(item => {
        return {
          ...item.payload.doc.data(),
          id: item.payload.doc.id
        } as Noticia;
      })
    }, (error: AppError) => {
      if (error instanceof NotFoundError) {
        alert("Erro 404. Arquivo não encontrado...");
      } else {
        console.log(error);
        alert("Uma exceção inesperada ocorreu.");
      }
    });
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
