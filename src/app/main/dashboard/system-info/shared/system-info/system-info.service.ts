import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arch, hostname, release, type, uptime, userInfo, homedir } from 'os';
import { totalmem } from 'os';
import { cpus } from 'os';

@Injectable()
export class SystemInfoService {

  constructor() {
  }

  public getHumanReadableSize(size: number): string {
    let decimalPower = 1;

    while (size > 1024) {
      size /= 1024;
      decimalPower++;
    }
    size = Math.round(size * 100) / 100;
    return size.toString() + ' ' + this.decimalPowerToUnit(decimalPower);
  }

  private decimalPowerToUnit(power: number): string {
    switch (power) {
      case 1:
        return 'Byte';
      case 2:
        return 'KB';
      case 3:
        return 'MB';
      case 4:
        return 'GB';
      case 5:
        return 'TB';
      case 6:
        return 'PB';
    }
  }

  public getOS(): String {
    switch (type()) {
      case 'Windows_NT':
        return 'Windows';
      case 'Linux':
        return 'Linux';
      case 'Darwin':
        return 'OS X';
    }
  }

  public getArch(): String {
    switch (arch()) {
      case 'x64':
        return '64 Bit';
      case 'x86':
        return '32 Bit';
    }
  }

  public getRelease(): String {
    return release();
  }

  public getUser(): String {
    return userInfo().username;
  }

  public getHome(): String {
    return homedir();
  }

  public getHostname(): String {
    return hostname();
  }

  public getUptimeSeconds(): number {
    return uptime();
  }

  public getUptime(): Observable<number> {
    return Observable.interval(1000).map(_x => {
      return uptime();
    });
  }

  public getTotalMemory(): number {
    return totalmem();
  }

  public getCpus(): Array<String> {
    return Array.from(new Set(cpus().map(cpu => cpu.model)));
  }

}
