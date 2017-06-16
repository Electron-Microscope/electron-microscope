import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiskExplorerComponent } from './disk-explorer.component';
import { MdCardModule, MdIconModule, MdListModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    ChartModule
  ],
  declarations: [
    DiskExplorerComponent
  ],
  exports: [
    DiskExplorerComponent
  ]
})
export class DiskExplorerModule {
}
