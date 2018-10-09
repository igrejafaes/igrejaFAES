import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';

import { clAgenda } from '../models/clAgenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agendaCollection: AngularFirestoreCollection<clAgenda>
  agenda: Observable<clAgenda[]>

  constructor(private db: AngularFirestore) {
  }
  
  getAgenda(): Observable<clAgenda[]> {
    this.agendaCollection = this.db.collection('agenda') //reference
    this.agenda = this.agendaCollection.valueChanges() //observable
    return this.agenda
  }

  setAgenda() {
    this.db.collection('agenda').add({
      Titulo: 'Culto de Oração',
      AgendaData: '05/Jun/2018',
      Descricao: "Amet officia excepteur dolore eiusmod occaecat proident et culpa occaecat excepteur consectetur duis mollit reprehenderit.",
      Imagem: '../../assets/images/agenda_2.jpg',
      Local: 'Av. Ibitiguaia, 855 - Juiz de Fora - MG',
      Filial: 'FAES Sede'
    })

    this.db.collection('agenda').add({
      Titulo: 'Culto da Vitória',
      AgendaData: '06/Jul/2018',
      Descricao: "Quis sit ut do reprehenderit excepteur et et deserunt excepteur excepteur labore.",
      Imagem: '../../assets/images/agenda_3.jpg',
      Local: 'Av. Senhor dos Passos, 1960 - São Pedro - Juiz de Fora - MG',
      Filial: 'FAES São Pedro'
    })

    this.db.collection('agenda').add({
      Titulo: 'Culto de Adoração',
      AgendaData: '10/Ago/2018',
      Descricao: "Cillum irure ad ut mollit ex enim incididunt sunt elit irure proident anim non.",
      Imagem: '../../assets/images/agenda_4.jpg',
      Local: 'R. Maria Aparecida Horanides, 10',
      Filial: 'FAES Aparecida'
    })

  }

}
