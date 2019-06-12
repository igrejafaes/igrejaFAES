import { Injectable } from '@angular/core';
import { Noticia } from '../models/clNoticia';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { NotFoundError } from '../shared/app-errors/not-found-error';
import { AppError } from '../shared/app-errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  noticiaCollection: AngularFirestoreCollection<Noticia>;
  noticia$: Observable<Noticia[]>;

  constructor(private db: AngularFirestore) {
    // REFERENCE & ORDERBY
    this.noticiaCollection = this.db.collection('noticia', ref => {
      return ref.orderBy('noticiaData')
    });
  }

  getNoticiasSnapshot(): Observable<any> {
    // RETURN
    return this.noticiaCollection.snapshotChanges()
    .pipe(take(1))
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotFoundError())
      } else {
        return Observable.throw(new AppError(error))
      }
    });
  }

  deleteNoticia(id: string): any{

  }

  getNoticias(): Noticia[] {
    let noticias = [];

    noticias.push(
      {
        imageURL: "https://picsum.photos/150/100/?image=1061",
        titulo: "Festa dos Jovens",
        descricao: "Duis laboris esse officia aute.",
        noticiaData: "2018/10/10"
      },
      {
        imageURL: "https://picsum.photos/150/100/?image=1056",
        titulo: "Confraternização em São Pedro",
        descricao: "Ullamco reprehenderit culpa velit magna sint aliquip et sit aliqua nostrud.",
        noticiaData: "2018/11/20"
      },
      {
        imageURL: "https://picsum.photos/150/100/?image=2",
        titulo: "Congresso Mulheres FAES",
        descricao: "Lorem irure occaecat ut et reprehenderit elit. Sint enim elit reprehenderit non nisi tempor.",
        noticiaData: "2018/12/03"
      }, 
      {
        imageURL: "https://picsum.photos/150/100/?image=1073",
        titulo: "Encontro de Casais",
        descricao: "Laborum ullamco consectetur enim est occaecat voluptate.",
        NoticiaData: "2018/07/05"
      }, 
      {
        imageURL: "https://picsum.photos/150/100/?image=1066",
        titulo: "Casamento do Jonny",
        descricao: "Dolor incididunt duis cupidatat sint. Dolore est qui Lorem commodo.",
        NoticiaData: "2018/05/11"
      }
    )

    return noticias;
}

}
