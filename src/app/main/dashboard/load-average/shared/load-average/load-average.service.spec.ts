/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadAverageService } from './load-average.service';

describe('Service: LoadAverage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadAverageService]
    });
  });

  it('should ...', inject([LoadAverageService], (service: LoadAverageService) => {
    expect(service).toBeTruthy();
  }));
});
