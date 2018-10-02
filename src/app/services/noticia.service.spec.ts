import { TestBed, inject } from '@angular/core/testing';

import { NoticiaService } from './noticia.service';

describe('NoticiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoticiaService]
    });
  });

  it('should be created', inject([NoticiaService], (service: NoticiaService) => {
    expect(service).toBeTruthy();
  }));
});
