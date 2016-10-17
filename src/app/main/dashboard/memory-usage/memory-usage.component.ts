import {Component, OnInit, ViewChild} from '@angular/core';
import {MemoryUsageService} from "./shared/memory-usage/memory-usage.service";
import {ChartComponent} from "angular2-highcharts";
import {Subscription} from "rxjs";

@Component({
  selector: 'em-memory-usage',
  templateUrl: './memory-usage.component.html',
  styleUrls: ['memory-usage.component.scss'],
  providers: [
    MemoryUsageService
  ]
})
export class MemoryUsageComponent implements OnInit {
  @ViewChild(ChartComponent)
  private chart: ChartComponent;
  private subscriptions: Array<Subscription> = [];

  private interval = 1;
  private history = 600;

  current = {
    free: 0,
    used: 0,
    total: 0
  };

  private chartColors = ['#ffd740', '#69f0ae', '#7c4dff'];
  private options: HighchartsOptions = {
    chart: {
      width: 448,
      height: 300,
      type: "area"
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },
    yAxis: {
      title: {
        text: "memory (GB)"
      }
    },
    xAxis: {
      title: {
        text: "Time (s)"
      }
    },
    series: [
      {
        name: "used",
        data: [],
        color: this.chartColors[1]
      },
      {
        name: "total",
        data: [],
        color: this.chartColors[2],
        type: "line"
      }
    ]
  };

  constructor(private memoryUsage: MemoryUsageService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.memoryUsage.getMemoryUsageInInterval(this.interval).subscribe(memory=> {
      const timestamp = `${memory.timestamp.getUTCHours()}:${memory.timestamp.getUTCMinutes()}:${memory.timestamp.getUTCSeconds()}`;

      this.current.free = this.byteToGigaByte(memory.free);
      this.current.used = this.byteToGigaByte(memory.total - memory.free);
      this.current.total = this.byteToGigaByte(memory.total);

      this.chart.chart.series.forEach((val, index) => {
        if (this.chart.chart.series[index].data.length >= this.history) {
          this.chart.chart.series[index].removePoint(0);
        }
        this.chart.chart.series[index].addPoint({
          name: timestamp,
          x: memory.sequenceNumber*this.interval,
          y: Math.round(this.byteToGigaByte(this.getMemoryValueByIndex(memory, index))*100)/100,
          marker: {enabled: false}
        });
      });

    }));
  }

  byteToGigaByte(bytes: number): number {
    return bytes / 1024 / 1024 / 1024;
  }

  getMemoryValueByIndex(obs: {free: number; used: number; total: number; timestamp: Date; sequenceNumber: number; }, index: number): number {
    switch (index) {
      case 0:
        return obs.used;

      case 1:
        return obs.total;

      default:
        return -1;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


}
