/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SystemInfoComponent } from './system-info.component';
import { SystemInfoService } from './shared/system-info/system-info.service';

describe('Component: SystemInfo', () => {
  it('should create an instance', () => {
    let component = new SystemInfoComponent(new SystemInfoService());
    expect(component).toBeTruthy();
  });
});
