import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MdButtonToggleModule, MdCardModule, MdIconModule } from '@angular/material';
import { LoadAverageComponent } from './load-average/load-average.component';
import {
  DashboardCardComponent, DashboardCardContentComponent,
  DashboardCardActionsComponent, DashboardCardDetailContentComponent, DashboardCardChartComponent
} from './dashboard-card/dashboard-card.component';
import { ChartModule } from 'angular2-highcharts';
import {SystemInfoComponent} from './system-info/system-info.component';
import {MemoryUsageComponent} from './memory-usage/memory-usage.component';
import { CpuLoadComponent } from './cpu-load/cpu-load.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonToggleModule,
    MdIconModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    LoadAverageComponent,
    DashboardCardComponent,
    DashboardCardContentComponent,
    DashboardCardDetailContentComponent,
    DashboardCardChartComponent,
    DashboardCardActionsComponent,
    MemoryUsageComponent,
    CpuLoadComponent,
    SystemInfoComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
