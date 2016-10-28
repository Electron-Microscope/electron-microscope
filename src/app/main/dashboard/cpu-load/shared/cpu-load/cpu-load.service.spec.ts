/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CpuLoadService } from './cpu-load.service';

describe('Service: CpuLoad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpuLoadService]
    });
  });

  it('should ...', inject([CpuLoadService], (service: CpuLoadService) => {
    expect(service).toBeTruthy();
  }));
});
