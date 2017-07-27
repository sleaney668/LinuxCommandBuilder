import { TestBed, inject } from '@angular/core/testing';

import { OptionBuilderService } from './option-builder.service';

describe('OptionBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionBuilderService]
    });
  });

  it('should be created', inject([OptionBuilderService], (service: OptionBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
