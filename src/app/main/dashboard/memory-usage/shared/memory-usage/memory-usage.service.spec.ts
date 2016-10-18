/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemoryUsageService } from './memory-usage.service';

describe('Service: MemoryUsage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryUsageService]
    });
  });

  it('should ...', inject([MemoryUsageService], (service: MemoryUsageService) => {
    expect(service).toBeTruthy();
  }));
});
