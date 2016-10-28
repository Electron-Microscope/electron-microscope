import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { ViewChild } from '@angular/core/src/metadata/di';
import { DiskExplorerService } from './shared/disk-explorer.service';
import { resolve } from 'path';
import { colors } from '../../../colors';
const generateSteps = require('color-stepper').generateSteps;

@Component({
  selector: 'app-disk-explorer',
  templateUrl: './disk-explorer.component.html',
  styleUrls: ['disk-explorer.component.scss'],
  providers: [DiskExplorerService]
})
export class DiskExplorerComponent implements OnInit, AfterViewInit {
  @ViewChild(ChartComponent)
  private chart: ChartComponent;

  private detailedEntries = 10;

  // colors for the entries and one default color (last element is default), which are
  // shuffled to avoid similar colors next to each other
  private colorPalette = generateSteps(colors, this.detailedEntries + 1).sort(function() {
    return .5 - Math.random();
  });

  private currentPath = resolve(process.cwd(), 'src');
  private allFiles: Array<{name: string, size: number, color: string, directory:boolean}> = [];
  private options: HighchartsOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Sizes',
      align: 'center',
      verticalAlign: 'middle',
      y: 0,
      x: 0
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 0,
        cursor: 'pointer',
        innerSize: 120,
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Size',
      colorByPoint: true,
      data: []
    }]
  };

  constructor(private diskExplorerService: DiskExplorerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.showDir(this.currentPath);

    window.onresize = () => {
      this.chart.chart.setSize((window.innerWidth - 500)*0.6, window.innerHeight*0.6);
    };
  }

  private showDir(dir:string) {
    const sizes = this.diskExplorerService.getEntries(dir);


    sizes.then((sizes) => {
      const sorted = sizes.sort(function(a, b) {
        if(a.size == b.size) return 0;

        return a.size < b.size ? 1 : -1;
      }).map((entry, entryIndex) => {
        entry.color = entryIndex < this.detailedEntries ? this.colorPalette[entryIndex] : this.colorPalette.slice(-1)[0];
        return entry;
      });

      this.allFiles = sorted;

      const first = sorted.slice(0,this.detailedEntries - 1);
      const other = sorted.slice(this.detailedEntries).reduce((acc, curr) => {acc.size += curr.size; return acc}, {name: 'Other', size: 0, directory: true, color: this.colorPalette.slice(-1)[0]});

      const chartEntries = first.concat(other);

      let totalSize = Math.round(chartEntries.reduce((acc, curr) => acc + curr.size, 0)/1024/1024 * 100) / 100;
      let totalSizeString = totalSize+" MB";

      chartEntries.forEach(size => {
        this.chart.chart.series[0].addPoint({
          name: size.name,
          y: size.size,
          color: size.color
        });
      });

      this.chart.chart.setTitle({text:totalSizeString});
    });


  }

  private changeDir(newDir: string) {
    this.currentPath = resolve(this.currentPath, newDir);

    // clear
    this.chart.chart.series[0].setData([], true,true,true);
    this.allFiles = [];

    // refresh
    this.showDir(this.currentPath);
  }

}
