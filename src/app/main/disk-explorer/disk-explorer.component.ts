import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartComponent } from 'angular2-highcharts';
import { ViewChild } from '@angular/core/src/metadata/di';
import { DiskExplorerService } from './shared/disk-explorer.service';
import { resolve } from 'path';

@Component({
  selector: 'app-disk-explorer',
  templateUrl: './disk-explorer.component.html',
  styleUrls: ['disk-explorer.component.scss'],
  providers: [DiskExplorerService]
})
export class DiskExplorerComponent implements OnInit, AfterViewInit {
  @ViewChild(ChartComponent)
  private chart: ChartComponent;

  private currentPath = process.cwd();
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
      x: -30
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
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
      this.chart.chart.setSize(window.innerWidth - 500, window.innerHeight);
    };
  }

  private showDir(dir:string) {
    const sizes = this.diskExplorerService.getEntries(dir);

    sizes.then((sizes) => {
      sizes.sort(function(a, b) {
        return a.size > b.size ? b.size : a.size;
        //return a.name > b.name;
      });

      this.allFiles.push({name: '..', size: 0, color: 0, directory:true});
      sizes.forEach(size => {
        this.allFiles.push(size);

        this.chart.chart.series[0].addPoint({
          name: size.name,
          y: size.size,
          color: size.color
        });
      })
    });
  }

  private changeDir(newDir: string) {
    this.currentPath = resolve(this.currentPath, newDir);

    // clear
    //this.chart.chart.series[0].data = [];
    this.chart.chart.series[0].setData([], true,true,true);
    this.allFiles = [];

    this.showDir(this.currentPath);


    console.log("CHANGED");

    // refresh

  }

}
