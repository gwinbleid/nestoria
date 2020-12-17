import { TestBed } from '@angular/core/testing';

import { CountResolverService } from './count-resolver.service';

describe('CountResolverService', () => {
  let service: CountResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
