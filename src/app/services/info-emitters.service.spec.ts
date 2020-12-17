import { TestBed } from '@angular/core/testing';

import { InfoEmittersService } from './info-emitters.service';

describe('InfoEmittersService', () => {
  let service: InfoEmittersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoEmittersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
