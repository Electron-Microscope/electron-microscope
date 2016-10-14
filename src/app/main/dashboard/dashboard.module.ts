import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '@angular/material';
import { LoadAverageComponent } from './load-average/load-average.component';
import {
  DashboardCardComponent, DashboardCardContentComponent,
  DashboardCardActionsComponent, DashboardCardChartComponent
} from './dashboard-card/dashboard-card.component';
import { ChartModule } from 'angular2-highcharts';
import {MemoryUsageComponent} from "./memory-usage/memory-usage.component";

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
    DashboardCardChartComponent,
    DashboardCardActionsComponent,
    MemoryUsageComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
