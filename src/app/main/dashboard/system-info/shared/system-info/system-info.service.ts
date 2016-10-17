import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arch, hostname, release, type, uptime, userInfo, homedir } from 'os';
import { totalmem } from 'os';
import { cpus } from 'os';

@Injectable()
export class SystemInfoService {

  constructor() {
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
