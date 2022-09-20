import { TestBed } from '@angular/core/testing';

import { TodoFormStateService } from './todo-form-state.service';

describe('TodoFormStateService', () => {
  let service: TodoFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
