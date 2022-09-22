import { TestBed } from '@angular/core/testing';

import { UserDetailsModalStateService } from './user-details-modal-state.service';

describe('UserDetailsModalStateService', () => {
  let service: UserDetailsModalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsModalStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
