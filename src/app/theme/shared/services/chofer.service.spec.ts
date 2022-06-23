import { TestBed } from '@angular/core/testing';

import { ChoferService } from './chofer.service';

describe('ChoferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChoferService = TestBed.get(ChoferService);
    expect(service).toBeTruthy();
  });
});
