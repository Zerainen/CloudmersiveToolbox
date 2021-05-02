import { TestBed } from '@angular/core/testing';

import { PictureDescriptionService } from './picture-description.service';

describe('PictureDescriptionService', () => {
  let service: PictureDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
