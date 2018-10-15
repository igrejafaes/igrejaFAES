import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { clAgenda } from '../models/clAgenda';
import { AppError } from '../shared/app-errors/app-error';
import { NotFoundError } from '../shared/app-errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaCollection: AngularFirestoreCollection<clAgenda>;
  agenda: Observable<clAgenda[]>;

  constructor(private db: AngularFirestore) {
  }

  //Get todas as Agendas
  /****************************************************************************** */
  getAgenda(): Observable<clAgenda[]> {
    // REFERENCE & ORDERBY
    this.agendaCollection = this.db.collection('agenda', ref => {
      return ref.orderBy('AgendaData')
    });
    // OBSERVABLE
    this.agenda = this.agendaCollection.valueChanges();
    // RETURN
    return this.agenda
    .catch((error: Response) => {
      if (error.status === 404) {
        return Observable.throw(new NotFoundError())
      } else {
        return Observable.throw(new AppError(error))
      }
    });
  }
  
  //Cria nova Agenda
  /****************************************************************************** */
  createAgenda() {
    this.db.collection('agenda').add([{
      Titulo: 'Culto de Oração',
      AgendaData: '05/Jun/2018',
      Descricao: "Amet officia excepteur dolore eiusmod occaecat proident et culpa occaecat excepteur consectetur duis mollit reprehenderit.",
      Imagem: '../../assets/images/agenda_2.jpg',
      Local: 'Av. Ibitiguaia, 855 - Juiz de Fora - MG',
      Filial: 'FAES Sede'
    }, {
      Titulo: 'Culto da Vitória',
      AgendaData: '06/Jul/2018',
      Descricao: "Quis sit ut do reprehenderit excepteur et et deserunt excepteur excepteur labore.",
      Imagem: '../../assets/images/agenda_3.jpg',
      Local: 'Av. Senhor dos Passos, 1960 - São Pedro - Juiz de Fora - MG',
      Filial: 'FAES São Pedro'
    }, {
      Titulo: 'Culto de Adoração',
      AgendaData: '10/Ago/2018',
      Descricao: "Cillum irure ad ut mollit ex enim incididunt sunt elit irure proident anim non.",
      Imagem: '../../assets/images/agenda_4.jpg',
      Local: 'R. Maria Aparecida Horanides, 10',
      Filial: 'FAES Aparecida'
    }])
    
  }
  
  //Atualiza a Agenda
  /****************************************************************************** */
  updateAgenda(){
    
  }
  
  //Deleta a Agenda pelo uID
  /****************************************************************************** */
  deleteAgenda(){
    
  }

}
