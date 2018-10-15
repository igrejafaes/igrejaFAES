import { TestBed, inject } from '@angular/core/testing';

import { GetImageUrlService } from './get-image-url.service';

describe('GetImageUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetImageUrlService]
    });
  });

  it('should be created', inject([GetImageUrlService], (service: GetImageUrlService) => {
    expect(service).toBeTruthy();
  }));
});
