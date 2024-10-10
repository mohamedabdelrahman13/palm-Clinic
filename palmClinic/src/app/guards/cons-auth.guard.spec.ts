import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { consAuthGuard } from './cons-auth.guard';

describe('consAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => consAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
