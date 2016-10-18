import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '@angular/material';
import { LoadAverageComponent } from './load-average/load-average.component';
import {
  DashboardCardComponent, DashboardCardContentComponent,
  DashboardCardActionsComponent, DashboardCardChartComponent, DashboardCardDetailContentComponent
} from './dashboard-card/dashboard-card.component';
import { ChartModule } from 'angular2-highcharts';
import {MemoryUsageComponent} from "./memory-usage/memory-usage.component";
import { CpuLoadComponent } from './cpu-load/cpu-load.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
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
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
