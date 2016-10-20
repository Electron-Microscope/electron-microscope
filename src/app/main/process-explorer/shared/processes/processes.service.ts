import { Injectable } from '@angular/core';
const lookup: Function = require('current-processes').get;
import { Observable } from 'rxjs';

export class ProcessInformation {
  pid: string;
  name: string;
  cpu: number;
  memory: number;

  constructor(pid: string, name: string, cpu: number, memory: number) {
    this.pid = pid;
    this.name = name;
    this.cpu = cpu;
    this.memory = memory;
  }
}

@Injectable()
export class ProcessesService {

  private _sortingProperty = 'pid';
  private _sortingOrder = +1;

  constructor() {
  }

  get sortingProperty(): string {
    return this._sortingProperty;
  }

  set sortingProperty(value: string) {
    if (value) { this._sortingProperty = value; }
  }

  get sortingOrder(): number {
    return this._sortingOrder;
  }

  set sortingOrder(value: number) {
    if (value) { this._sortingOrder = value; }
  }

  getProcessesInInterval(interval = 0): Observable<Array<ProcessInformation>> {
    return Observable.interval(interval * 1000).flatMap(this.getProcesses.bind(this));
  }

  getProcesses(): Promise<Array<ProcessInformation>> {
    // get the list of all running processes
    return new Promise((resolve, reject) => {
      lookup((err, res) => {
        if (err) { reject(err); return; }

        resolve(res
          .map(currProcess => new ProcessInformation(currProcess.pid, currProcess.name, currProcess.cpu, currProcess.mem.usage))
          .sort((left, right) => {
            return this._sortingOrder * (left[this._sortingProperty] < right[this._sortingProperty] ? -1 : +1);
          })
        );
      });
    });
  }

}
