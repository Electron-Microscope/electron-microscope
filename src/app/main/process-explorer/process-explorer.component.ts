import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnMode, TableColumn, TableOptions } from 'angular2-data-table';
import { ProcessInformation, ProcessesService } from './shared/processes/processes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'em-process-explorer',
  templateUrl: './process-explorer.component.html',
  styleUrls: ['process-explorer.component.scss'],
  providers: [
    ProcessesService
  ]
})
export class ProcessExplorerComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  private interval = 5;

  private rows: Array<ProcessInformation> = [];

  private options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: 'Pid' }),
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Cpu', comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Memory', comparator: this.sorter.bind(this) }),
    ]
  });

  constructor(private processes: ProcessesService) { }

  ngOnInit() {
    this.subscriptions.push(this.processes.getProcessesInInterval(this.interval).subscribe(data => {
      this.rows = data;
    }));
  }

  sorter() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
