import { Injectable } from '@angular/core';
import { clReuniao } from '../models/clReuniao';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService {

  constructor() { }

  getReunioes() {
    let reunioes : clReuniao[] = [];

    reunioes.push(
      {
        DiaDaSemana: 'Segunda',
        Hora: '15h',
        Titulo: 'Culto da Tarde'
      },
      {
        DiaDaSemana: 'Terça',
        Hora: '19h',
        Titulo: 'Reunião de Oração'
      },
      {
        DiaDaSemana: 'Quinta',
        Hora: '19h30',
        Titulo: 'Culto de Doutrina'
      },
      {
        DiaDaSemana: 'Domingo',
        Hora: '17h30',
        Titulo: 'Escola Dominical'
      },
      {
        DiaDaSemana: 'Domingo',
        Hora: '19h',
        Titulo: 'Culto Dominical'
      }
    )

    return reunioes;
  }

}
