import { TestBed, inject } from '@angular/core/testing';

import { ReuniaoService } from './reuniao.service';

describe('ReuniaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReuniaoService]
    });
  });

  it('should be created', inject([ReuniaoService], (service: ReuniaoService) => {
    expect(service).toBeTruthy();
  }));
});
