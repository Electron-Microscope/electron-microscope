import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { Subscription } from 'rxjs/Rx';
import { colors } from '../../../../colors';
import { CpuLoadService } from './shared/cpu-load/cpu-load.service';
const generateSteps = require('color-stepper').generateSteps;

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

  private interval = 1;
  private history = 50;

  public currentTotal = {load: 0, speed: 0};
  public currents: Array<{load: number, speed: number}> = [];

  private chartColors = generateSteps(colors, this.cpuLoad.getNumberOfCPUs() + 1);
  public options: any = {
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
        color: this.chartColors[index]
      };
    }).concat([
      {
        name: 'Total',
        data: [],
        color: this.chartColors.slice(-1)[0]
      }
    ])
  };

  public detailsView = 'chart';

  constructor(private cpuLoad: CpuLoadService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.cpuLoad.getCPULoadInInterval(this.interval).subscribe(load => {
      const timestamp = `${load.timestamp.getUTCHours()}:${load.timestamp.getUTCMinutes()}:${load.timestamp.getUTCSeconds()}`;

      this.currentTotal = {load: load.loads[load.loads.length - 1], speed: load.speeds[load.speeds.length - 1]};
      load.loads.slice(0, -1).forEach((val, index) => this.currents[index] = {load: val, speed: load.speeds[index]});

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
