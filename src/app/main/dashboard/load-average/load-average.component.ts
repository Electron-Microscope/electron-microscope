import {
  Component, OnInit, OnDestroy, ViewChild,
  AfterViewInit
} from '@angular/core';
import { LoadAverageService } from './shared/load-average/load-average.service';
import { Subscription } from 'rxjs';
import { ChartComponent } from 'angular2-highcharts';
import { colors } from '../../../../colors';

@Component({
  selector: 'em-load-average',
  templateUrl: './load-average.component.html',
  styleUrls: ['load-average.component.scss'],
  providers: [
    LoadAverageService
  ]
})
export class LoadAverageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ChartComponent)
  private chart: ChartComponent;

  private subscriptions: Array<Subscription> = [];

  private interval: number = 1;
  private history: number = 50;

  private curr1 = 0;
  private curr5 = 0;
  private curr15= 0;

  private chartColors = colors;
  private options: HighchartsOptions = {
    chart: {
      width: 448,
      height: 300,
      type: 'area'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    series: [
      {
        name: '1min',
        data: [],
        color: this.chartColors[0]
      },
      {
        name: '5min',
        data: [],
        color: this.chartColors[1]
      },
      {
        name: '15min',
        data: [],
        color: this.chartColors[2]
      }
    ]
  };


  constructor(private loadAverage: LoadAverageService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.loadAverage.getLoadAverageInInterval(this.interval).subscribe(load => {
      const timestamp = `${load.timestamp.getUTCHours()}:${load.timestamp.getUTCMinutes()}:${load.timestamp.getUTCSeconds()}`;

      this.curr1 = load.load[0];
      this.curr5 = load.load[1];
      this.curr15 = load.load[2];

      this.chart.chart.series.forEach((val, index) => {
        if (this.chart.chart.series[index].data.length >= this.history) {
          this.chart.chart.series[index].removePoint(0);
        }
        this.chart.chart.series[index].addPoint({name: timestamp, x: load.sequenceNumber, y: load.load[index], marker: {enabled: false}});
      });

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
