import { TestBed, inject } from '@angular/core/testing';

import { ChmodService } from './chmod.service';

describe('ChmodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChmodService]
    });
  });

  it('should be created', inject([ChmodService], (service: ChmodService) => {
    expect(service).toBeTruthy();
  }));
});
