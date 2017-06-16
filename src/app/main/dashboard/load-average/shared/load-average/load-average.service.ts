import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { loadavg } from 'os';

@Injectable()
export class LoadAverageService {

  constructor() { }

  /**
   * Generates an Observable which emits load average information in a given interval
   * @param interval {number} Interval in seconds
   * @return {Observable<R>} Observable, which emits load average information as Objects. The Result Objects contain the
   * measurement time in Unixtime milliseconds (timestamp), the number of the current measurement (sequenceNumber) and
   * the Array of load averages (1 min, 5 min, 15 min) (load)
   */
  public getLoadAverageInInterval(interval = 0): Observable<{load: Array<number>, timestamp: Date, sequenceNumber: number}> {
    return Observable.interval(interval * 1000).timestamp().map(x => {
      return {
        load: loadavg(),
        timestamp: new Date(x.timestamp),
        sequenceNumber: x.value
      };
    });
  }

  /**
   * Gets the current load average
   * @return {number[]} Array of load averages (1 min, 5 min, 15min)
   */
  public getCurrentLoadAverage(): Array<number> {
    return loadavg();
  }
}
