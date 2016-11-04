import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ColumnMode, TableColumn, TableOptions, DataTable } from 'angular2-data-table';
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
  @ViewChild(DataTable)
  private table: DataTable;

  private dataSubscription: Subscription = null;

  private interval = 5;

  private rows: Array<{pid: string, name: string, cpu: string, memory: string}> = [];

  private options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    detailRowHeight: 56,
    rowHeight: 'auto',
    columns: [
      new TableColumn({ name: 'Pid', comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Name', sortable: true, comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Cpu', comparator: this.sorter.bind(this) }),
      new TableColumn({ name: 'Memory', comparator: this.sorter.bind(this) }),
    ]
  });

  constructor(private processes: ProcessesService) {
    this.processes.getProcesses().then(data => this.rows = data.map(row => this.convertProcessInformation(row)));
  }

  ngOnInit() {
    this.setupSubscription();
  }

  convertProcessInformation(inf: ProcessInformation): {pid: string, name: string, cpu: string, memory: string} {
    return {
      pid: inf.pid,
      name: inf.name,
      cpu: `${inf.cpu}%`,
      memory: `${inf.memory.toFixed(2)}GB`
    };
  }

  sorter(rows, dirs) {
    this.processes.sortingProperty = dirs[0].prop;
    this.processes.sortingOrder = dirs[0].dir == 'desc' ? 1 : -1;
    this.processes.getProcesses().then(data =>  this.rows = data.map(row => this.convertProcessInformation(row)));
  }

  killProcess(pid) {
    this.processes.killProcess(pid).then(() => {
      // re-list processes after killing
      this.processes.getProcesses().then(data => this.rows = data.map(row => this.convertProcessInformation(row)));
    });
  }

  toggleExpandRow(row) {
    this.toggleSubscription();
    this.table.toggleExpandRow(row);
  }

  toggleSubscription() {
    if (this.dataSubscription) {
      this.removeSubscription();
    } else {
      this.setupSubscription();
    }
  }

  setupSubscription() {
    this.dataSubscription = this.processes.getProcessesInInterval(this.interval).subscribe(data => {
      this.rows = data.map(row => this.convertProcessInformation(row));
    });
  }

  removeSubscription() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.dataSubscription = undefined;
    }
  }

  ngOnDestroy() {
    this.removeSubscription();
  }
}
