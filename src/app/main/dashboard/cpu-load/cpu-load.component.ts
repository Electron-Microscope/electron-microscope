import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CpuLoadService } from './shared/cpu-load/cpu-load.service';
import { ChartComponent } from 'angular2-highcharts';
import { ViewChild } from '@angular/core/src/metadata/di';
import { Subscription } from 'rxjs';

@Component({
  selector: 'em-cpu-load',
  templateUrl: './cpu-load.component.html',
  styleUrls: ['cpu-load.component.scss'],
  providers: [
    CpuLoadService
  ]
})
export class CpuLoadComponent implements OnInit, AfterViewInit {
  @ViewChild(ChartComponent)
  private chart: ChartComponent;

  private subscriptions: Array<Subscription> = [];

  private interval: number = 1;
  private history: number = 50;

  private currentTotal = 0;
  private currents: Array<number> = [];

  private totalColor = '#18ffff';
  private chartColors = ['#ffd740', '#69f0ae', '#7c4dff'];
  private options: HighchartsOptions = {
    chart: {
      width: 448,
      height: 250,
      type: 'area'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    series: Array.apply(null, Array(this.cpuLoad.getNumberOfCPUs())).map((_, index) => {
      return {
        name: `Cpu${index}`,
        data: [],
        color: this.chartColors[index % this.chartColors.length]
      };
    }).concat([
      {
        name: 'Total',
        data: [],
        color: this.totalColor
      }
    ])
  };

  private detailsView = 'chart';

  constructor(private cpuLoad: CpuLoadService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.cpuLoad.getCPULoadInInterval(this.interval).subscribe(load => {
      const timestamp = `${load.timestamp.getUTCHours()}:${load.timestamp.getUTCMinutes()}:${load.timestamp.getUTCSeconds()}`;

      this.currentTotal = load.loads[load.loads.length - 1];
      load.loads.slice(0, -1).forEach((val, index) => this.currents[index] = val);

      this.chart.chart.series.forEach((val, index) => {
        if (this.chart.chart.series[index].data.length >= this.history) {
          this.chart.chart.series[index].removePoint(0);
        }
        this.chart.chart.series[index]
          .addPoint({name: timestamp, x: load.sequenceNumber, y: load.loads[index] * 100, marker: {enabled: false}});
      });

    }));
  }

}
