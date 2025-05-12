import { TestBed } from '@angular/core/testing';

import { HomePortalService } from './home-portal.service';

describe('HomePortalService', () => {
  let service: HomePortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
