import { Injectable } from '@angular/core';
import { clNoticia } from '../models/clNoticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor() { }

  getNoticias(): clNoticia[] {
    let noticias = [];

    noticias.push(
      {
        Imagem: "https://picsum.photos/150/100/?image=1061",
        NoticiaTitulo: "Festa dos Jovens",
        NoticiaTexto: "Duis laboris esse officia aute.",
        NoticiaData: "10/10/2018"
      },
      {
        Imagem: "https://picsum.photos/150/100/?image=1056",
        NoticiaTitulo: "Confraternização em São Pedro",
        NoticiaTexto: "Ullamco reprehenderit culpa velit magna sint aliquip et sit aliqua nostrud.",
        NoticiaData: "20/11/2018"
      },
      {
        Imagem: "https://picsum.photos/150/100/?image=2",
        NoticiaTitulo: "Congresso Mulheres FAES",
        NoticiaTexto: "Lorem irure occaecat ut et reprehenderit elit. Sint enim elit reprehenderit non nisi tempor.",
        NoticiaData: "03/12/2018"
      }, 
      {
        Imagem: "https://picsum.photos/150/100/?image=1073",
        NoticiaTitulo: "Encontro de Casais",
        NoticiaTexto: "Laborum ullamco consectetur enim est occaecat voluptate.",
        NoticiaData: "05/07/2018"
      }, 
      {
        Imagem: "https://picsum.photos/150/100/?image=1066",
        NoticiaTitulo: "Casamento do Jonny",
        NoticiaTexto: "Dolor incididunt duis cupidatat sint. Dolore est qui Lorem commodo.",
        NoticiaData: "11/05/2018"
      }
    )

    return noticias;
}

}
