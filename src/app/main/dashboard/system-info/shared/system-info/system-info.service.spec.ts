/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemInfoService } from './system-info.service';

describe('Service: SystemInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemInfoService]
    });
  });

  it('should ...', inject([SystemInfoService], (service: SystemInfoService) => {
    expect(service).toBeTruthy();
  }));
});
