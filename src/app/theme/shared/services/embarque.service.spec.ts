import { TestBed } from '@angular/core/testing';

import { EmbarqueService } from './embarque.service';

describe('EmbarqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbarqueService = TestBed.get(EmbarqueService);
    expect(service).toBeTruthy();
  });
});
