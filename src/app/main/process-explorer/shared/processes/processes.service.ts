import { Injectable } from '@angular/core';
const lookup: Function = require('ps-node').lookup;
import { Observable } from 'rxjs';

export class ProcessInformation {
  pid: string;
  command: string;
  arguments: string;
  cpu: number;
  memory: number;

  constructor(pid: string, command: string, args: string) {
    this.pid = pid;
    this.command = command;
    this.arguments = args;
  }
}

@Injectable()
export class ProcessesService {

  constructor() { }

  getProcessesInInterval(interval = 0): Observable<Array<ProcessInformation>> {
    return Observable.interval(interval * 1000).flatMap(this.getProcesses);
  }

  getProcesses() : Promise<Array<ProcessInformation>> {
    // get the list of all running processes
    return new Promise((resolve, reject) => {
      lookup({psargs: 'aux'}, (err, res) => {
        if (err) { reject(err); return;}

        console.log(res);
        resolve(res.map(currProcess => new ProcessInformation(currProcess.pid, currProcess.command, currProcess.arguments)));
      })
    })
  }

}
