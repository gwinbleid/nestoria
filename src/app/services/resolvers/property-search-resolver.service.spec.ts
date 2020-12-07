import { TestBed } from '@angular/core/testing';

import { PropertySearchResolverService } from './property-search-resolver.service';

describe('PropertySearchResolverService', () => {
  let service: PropertySearchResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertySearchResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
