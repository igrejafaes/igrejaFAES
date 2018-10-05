import { Injectable } from '@angular/core';
import { clInfoIgreja } from '../models/clInfoIgreja';

@Injectable({
  providedIn: 'root'
})
export class InfoigrejaService {

  constructor() { }
  
  GetInfoIgreja(){
    let info: clInfoIgreja = {
      Endereco : 'Rua Ibitiguaia, 855',
      Bairro : 'Santa Luzia',
      Cidade: 'Juiz de Fora',
      UF : 'MG',
      CEP : '36031-000',
      Telefone1 : '(32) 3216-3255',
      Telefone2 : '(32) 98831-3881',
      Email : 'ieadfaes@gmail.com',
    };

    return info;
  }


}
