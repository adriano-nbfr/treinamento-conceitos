import { TestBed } from '@angular/core/testing';

import { PortalApi } from './portal-api';

describe('PortalApi', () => {
  let service: PortalApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
