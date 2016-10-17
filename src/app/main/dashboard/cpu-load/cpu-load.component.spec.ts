/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CpuLoadComponent } from './cpu-load.component';
import { CpuLoadService } from './shared/cpu-load/cpu-load.service';

describe('Component: CpuLoad', () => {
  it('should create an instance', () => {
    let component = new CpuLoadComponent(new CpuLoadService());
    expect(component).toBeTruthy();
  });
});
