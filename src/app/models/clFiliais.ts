export class Filiais {
  
  private filiais = [
    {
      filial: 'FAES Sede',
      endereco: 'Av. Ibitiguaia, 855',
      bairro: 'Santa Luzia',
      cidade: 'Juiz de Fora',
      UF: 'MG'
    },
    {
      filial: 'FAES São Pedro',
      endereco: 'Av. Senhor dos Passos, 1960',
      bairro: 'São Pedro',
      cidade: 'Juiz de Fora',
      UF: 'MG'
    },
    {
      filial: 'FAES Aparecida',
      endereco: 'Rua Maria Aparecida Horanides, 10',
      bairro: 'Bairro Aparecida',
      cidade: 'Juiz de Fora',
      UF: 'MG'
    },
    {
      filial: 'FAES B. Lourdes',
      endereco: 'Rua Alguma',
      bairro: 'Bairro de Lourdes',
      cidade: 'Juiz de Fora',
      UF: 'MG'
    },
    {
      filial: 'FAES Casablanca',
      endereco: 'Rua Principal',
      bairro: 'Jd. Casablanca',
      cidade: 'Juiz de Fora',
      UF: 'MG'
    },
    {
      filial: 'FAES Rio Novo',
      endereco: 'Rua de Rio Novo',
      bairro: 'Centro',
      cidade: 'Rio Novo',
      UF: 'MG'
    },
  ];

  public getFiliaisName(): any[] {
    return this.filiais.map((fil) => fil.filial)
  }
}
