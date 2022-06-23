import { TestBed } from '@angular/core/testing';

import { DisembarkationService } from './disembarkation.service';

describe('DisembarkationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisembarkationService = TestBed.get(DisembarkationService);
    expect(service).toBeTruthy();
  });
});
