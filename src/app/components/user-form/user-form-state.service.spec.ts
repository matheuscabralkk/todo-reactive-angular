import { TestBed } from '@angular/core/testing';

import { UserFormStateService } from './user-form-state.service';

describe('UserFormStateService', () => {
  let service: UserFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
