import { TestBed } from '@angular/core/testing';

import { AuthorizationApiService } from './authorization-api.service';

describe('AuthorizationApiService', () => {
  let service: AuthorizationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
