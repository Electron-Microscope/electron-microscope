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
      new TableColumn({ name: 'Pid', comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Name', sortable: true, comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Cpu', comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Memory', comparator: this.sorter.bind(this) }),
    ]
  });

  constructor(private processes: ProcessesService) {
    this.processes.getProcesses().then(data => this.rows = data);
  }

  ngOnInit() {
    this.subscriptions.push(this.processes.getProcessesInInterval(this.interval).subscribe(data => {
      this.rows = data;
    }));
  }

  sorter(rows, dirs) {
    this.processes.sortingProperty = dirs[0].prop;
    this.processes.sortingOrder = dirs[0].dir == 'desc' ? -1 : +1;
    this.processes.getProcesses().then(data => this.rows = data);
  }

  killProcess(pid: number) {
    console.log(pid);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
