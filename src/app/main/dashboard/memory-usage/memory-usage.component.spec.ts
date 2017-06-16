/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MemoryUsageComponent } from './memory-usage.component';
import { MemoryUsageService } from './shared/memory-usage/memory-usage.service';

describe('Component: MemoryUsage', () => {
  it('should create an instance', () => {
    const component = new MemoryUsageComponent(new MemoryUsageService());
    expect(component).toBeTruthy();
  });
});
