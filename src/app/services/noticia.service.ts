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

  // GET NOTICIA SNAPSHOT
  /******************************************************************************/
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

  // GET NOTICIA BY ID SNAPSHOT
  /******************************************************************************/
  getNoticiasByID(id: string): Promise<Noticia> {
    return new Promise((resolve, reject) => {
      this.noticiaCollection
        .doc<Noticia>(id)
        .snapshotChanges()
        .pipe(take(1))
        .subscribe(actionArray => {
          resolve ({  id: actionArray.payload.id, ...actionArray.payload.data() })
        }, error => { reject(error) })
    })
  }

  // Cria nova Noticia
  /****************************************************************************** */
  addNewNoticia(noticia: Noticia): any {
    const noticiaWithoutID = { ...noticia } // create a new object
    delete noticiaWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.noticiaCollection.add(noticiaWithoutID as Noticia)
        .then(
          (docRef) => resolve(docRef.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }

  // Atualiza a Noticia
  /****************************************************************************** */
  updateNoticia(noticia: Noticia): Promise<any>{
    const noticiaWithoutID = { ...noticia } // create a new object
    delete noticiaWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.noticiaCollection.doc<Noticia>(noticia.id).set(noticiaWithoutID)
        .then(
          () => resolve(noticia.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }

  // Delete Noticia
  /****************************************************************************** */
  deleteNoticia(id: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.noticiaCollection.doc<Noticia>(id)
      .delete()
      .then(() => {
         resolve(true)
      }, (err) => reject(err))
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw(new NotFoundError())
        } else {
          return Observable.throw(new AppError(error))
        }
      });
    })
  }

  // GET NOTICIA BY ID SNAPSHOT
  /******************************************************************************/
  getNoticiasFotosByID(noticiaID): Observable<any> {
    // REFERENCE & ORDERBY
    const fotosCollection = this.db.collection(`noticia/${noticiaID}/fotos`)
    // RETURN
    return fotosCollection.snapshotChanges()
    .pipe(take(1))
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotFoundError())
      } else {
        return Observable.throw(new AppError(error))
      }
    });
  }


}
