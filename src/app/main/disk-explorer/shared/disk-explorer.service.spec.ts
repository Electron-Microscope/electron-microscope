/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiskExplorerService } from './disk-explorer.service';

describe('Service: DiskExplorer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiskExplorerService]
    });
  });

  it('should ...', inject([DiskExplorerService], (service: DiskExplorerService) => {
    expect(service).toBeTruthy();
  }));
});
