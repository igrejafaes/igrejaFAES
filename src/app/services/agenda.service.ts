import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { clAgenda } from '../models/clAgenda';
import { AppError } from '../shared/app-errors/app-error';
import { NotFoundError } from '../shared/app-errors/not-found-error';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaCollection: AngularFirestoreCollection<clAgenda>;
  agenda: Observable<clAgenda[]>;

  constructor(private db: AngularFirestore) {
    // REFERENCE & ORDERBY
    this.agendaCollection = this.db.collection('agenda', ref => {
      return ref.orderBy('agendaData')
    });
  }

  // GET AGENDA OBSERVABLE
  /****************************************************************************** */
  getAgenda(): Observable<clAgenda[]> {
    // OBSERVABLE
    this.agenda = this.agendaCollection.valueChanges();
    // RETURN
    return this.agenda
    .pipe(take(1))
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotFoundError())
      } else {
        return Observable.throw(new AppError(error))
      }
    });
  }

  // GET AGENDA SNAPSHOT
  /****************************************************************************** */
  getAgendaSnapshot(): Observable<any> {
    // RETURN
    return this.agendaCollection.snapshotChanges()
    .pipe(take(1))
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotFoundError())
      } else {
        return Observable.throw(new AppError(error))
      }
    });
  }

  // Cria nova Agenda
  /****************************************************************************** */
  addNewAgenda(agenda: clAgenda): any {
    const agendaWithoutID = { ...agenda } // create a new object
    delete agendaWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.agendaCollection.add(agendaWithoutID as clAgenda)
        .then(
          (docRef) => resolve(docRef.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }
 
  // Atualiza a Agenda
  /****************************************************************************** */
  updateAgenda(agenda: clAgenda): Promise<any>{
    const agendaWithoutID = { ...agenda } // create a new object
    delete agendaWithoutID.id // to save without ID

    return new Promise((resolve, reject) => {
      this.agendaCollection.doc<clAgenda>(agenda.id).set(agendaWithoutID)
        .then(
          () => resolve(agenda.id),
          (err) => reject(err)
        )
        .catch(
          (err) => console.log(err)
        )
    });
  }
  
  // Deleta a Agenda pelo uID
  /****************************************************************************** */
  deleteAgenda(id: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.agendaCollection.doc<clAgenda>(id)
      .delete()
      .then(() => {
         resolve(true)
      }, (err) => reject(err))
      .catch((reason)=> reject(reason))
    })
  }

}
