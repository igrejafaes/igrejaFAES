import { Injectable } from '@angular/core';
import { clAgenda } from '../models/clAgenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  constructor() { }
  
  getAgenda(): clAgenda[] {
    
    let agenda: clAgenda[] = []
    
    // DEFINE OS DADOS DA AGENDA
    agenda.push(
      {
        Titulo: 'Dia das Crianças',
        AgendaData: '01/Fev/2018',
        Descricao: "Tempor consequat occaecat commodo ipsum ex eiusmod enim.",
        Imagem: '../../assets/images/agenda_1.jpg'
      },
      {
        Titulo: 'Culto de Oração',
        AgendaData: '05/Jun/2018',
        Descricao: "Amet officia excepteur dolore eiusmod occaecat proident et culpa occaecat excepteur consectetur duis mollit reprehenderit.",
        Imagem: '../../assets/images/agenda_2.jpg'
      },
      {
        Titulo: 'Culto da Vitória',
        AgendaData: '06/Jul/2018',
        Descricao: "Quis sit ut do reprehenderit excepteur et et deserunt excepteur excepteur labore.",
        Imagem: '../../assets/images/agenda_3.jpg'
      },
      {
        Titulo: 'Culto de Adoração',
        AgendaData: '10/Ago/2018',
        Descricao: "Cillum irure ad ut mollit ex enim incididunt sunt elit irure proident anim non.",
        Imagem: '../../assets/images/agenda_4.jpg'
      }
    );

    return agenda;

  }


}
