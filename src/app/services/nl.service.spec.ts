import { TestBed } from '@angular/core/testing';

import { NlService } from './nl.service';

describe('NlService', () => {
  let service: NlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
