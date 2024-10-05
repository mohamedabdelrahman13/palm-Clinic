import { TestBed } from '@angular/core/testing';

import { UserConsultationsService } from './user-consultations.service';

describe('UserConsultationsService', () => {
  let service: UserConsultationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserConsultationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
