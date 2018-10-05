import { TestBed, inject } from '@angular/core/testing';

import { InfoigrejaService } from './infoigreja.service';

describe('InfoigrejaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoigrejaService]
    });
  });

  it('should be created', inject([InfoigrejaService], (service: InfoigrejaService) => {
    expect(service).toBeTruthy();
  }));
});
