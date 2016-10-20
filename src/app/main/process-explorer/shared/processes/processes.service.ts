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

  constructor() { }

  getProcessesInInterval(interval = 0): Observable<Array<ProcessInformation>> {
    return Observable.interval(interval * 1000).flatMap(this.getProcesses);
  }

  getProcesses(): Promise<Array<ProcessInformation>> {
    // get the list of all running processes
    return new Promise((resolve, reject) => {
      lookup((err, res) => {
        if (err) { reject(err); return; }

        resolve(res.map(currProcess => new ProcessInformation(currProcess.pid, currProcess.name, currProcess.cpu, currProcess.mem.usage)));
      });
    });
  }

}
