import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arch, hostname, platform, release, type, uptime, userInfo, homedir } from "os";

@Injectable()
export class SystemInfoService {

  constructor() {
  }

  public getOS(): String {
    switch (type()) {
      case 'Windows_NT':
        return "Windows";
      case 'Linux':
        return "Linux";
      case 'Darwin':
        return "OS X";
    }
  }

  public getArch(): String {
    switch (arch()) {
      case 'x64':
        return "64 Bit";
      case 'x86':
        return "32 Bit";
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
    /*let time = uptime();

    let hours = Math.floor(time / 3600);
    time -= hours * 3600;

    let minutes = Math.floor(time / 60);
    time -= minutes * 60;

    let seconds = time % 60;*/

    //return uptime();

    return Observable.interval(1000).timestamp().map(x => {
      return uptime();
    });
  }
}
