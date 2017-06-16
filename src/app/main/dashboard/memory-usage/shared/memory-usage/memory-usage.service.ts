import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {freemem, totalmem} from 'os';

@Injectable()
export class MemoryUsageService {

  constructor() {
  }

  /**
   * Generates an Observable which emits memory usage information in a given interval
   * @param interval {number} Interval in seconds
   * @return {Observable<R>} Observable, which emits memory usage information as Objects.
   */
  public getMemoryUsageInInterval(interval = 0): Observable<{free: number, used: number, total: number, timestamp: Date,
    sequenceNumber: number}> {
    return Observable.interval(interval * 1000).timestamp().map(x => {
      return {
        free: freemem(),
        used: totalmem() - freemem(),
        total: totalmem(),
        timestamp: new Date(x.timestamp),
        sequenceNumber: x.value
      };
    });
  }

  public getCurrentMemoryUsage(): {free: number, used: number, total: number, timestamp: Date, sequenceNumber: number} {
    return {
      free: freemem(),
      used: totalmem() - freemem(),
      total: totalmem(),
      timestamp: new Date(),
      sequenceNumber: 0
    };
  }

}
