import { TestBed } from '@angular/core/testing';

import { ActiveSectionService } from './active-section-service';

describe('ActiveSectionService', () => {
  let service: ActiveSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
