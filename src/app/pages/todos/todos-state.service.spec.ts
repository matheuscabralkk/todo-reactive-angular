import { TestBed } from '@angular/core/testing';

import { TodosStateService } from './todos-state.service';

describe('TodosStateService', () => {
  let service: TodosStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
