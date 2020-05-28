import { TestBed } from '@angular/core/testing';

import { ApithirdService } from './apithird.service';

describe('ApithirdService', () => {
  let service: ApithirdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApithirdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
