import { Injectable } from '@angular/core';
import { cpus } from 'os';
import { Observable } from 'rxjs';

@Injectable()
export class CpuLoadService {

  constructor() {
  }

  /**
   * Returns the number of CPUs of the machine
   * @return {number} the number of CPUs
   */
  public getNumberOfCPUs(): number {
    return cpus().length;
  }

  /**
   * Generates an Observable which emits cpu load information in a given interval
   * @param interval {number} Interval in seconds
   * @return {Observable<R>} Observable, which emits cpu load information as Objects. The Result Objects contain the
   * measurement time in Unixtime milliseconds (timestamp), the number of the current measurement (sequenceNumber) and
   * the Array of cpu loads (loads) for each core, as well as the load for the whole cpu (last element of loads) as relative numbers
   */
  public getCPULoadInInterval(interval: number = 0): Observable<{loads: Array<number>, timestamp: Date, sequenceNumber: number}> {
    return Observable.interval(interval * 1000).timestamp().flatMap<{loads: Array<number>, timestamp: Date, sequenceNumber: number}>(x => {
      return Observable.create(obs => {
        const loadsPrms = Promise.all(
          cpus().map((val, ind) => this.currentCPULoad(ind))
            .concat(this.currentCPULoad(undefined))
        ).then(loads => {
          obs.next({
            loads,
            timestamp: new Date(x.timestamp),
            sequenceNumber: x.value
          });
          obs.complete();
        });
      });
    });
  }

  private currentCPULoad(cpu: number | undefined): Promise<number> {
    return new Promise((resolve, reject) => {
      const ref = this.currentCPUAverage(cpu);

      setTimeout(() => {
        const curr = this.currentCPUAverage(cpu);

        const idleDiff = curr.idle - ref.idle;
        const totalDiff = curr.total - ref.total;

        resolve(idleDiff / totalDiff);
      }, 100)
    })
  }

  /**
   * Returns the current cpu load average
   * @param cpu {number | undefined } if a number is provided, the average for this cpu core si provided, otherwise the average of the whole cpu
   * @return {{idle: number, total: number}} idle and total time for the core / the cpu
   */
  private currentCPUAverage(cpu: number | undefined): {idle: number, total: number} {
    const cpusInformation = cpu ? [cpus()[cpu]] : cpus();

    const times = cpusInformation.reduce((prev, curr) => {
      return {
        idle: prev.idle + curr.times.idle,
        total: prev.total + Object.keys(curr.times).reduce((prev, currKey) => prev + curr.times[currKey], 0)
      }
    }, { idle: 0, total: 0 });

    return { idle: times.idle / cpusInformation.length, total: times.total / cpusInformation.length };
  }
}
