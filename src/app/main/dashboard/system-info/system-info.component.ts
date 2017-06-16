import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from './shared/system-info/system-info.service';
import * as dateFormat from 'dateformat';

@Component({
  selector: 'em-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css'],
  providers: [SystemInfoService]
})
export class SystemInfoComponent implements OnInit {
  public os: String;
  public arch: String;
  public release: String;
  public user: String;
  public home: String;
  public hostname: String;
  public uptimeDate = new Date(null);
  public startup: String;
  public totalMemory: String;
  public cpus: Array<String>;

  constructor(private sysinfoService: SystemInfoService) {
    this.os = sysinfoService.getOS();
    this.arch = sysinfoService.getArch();
    this.release = sysinfoService.getRelease();
    this.totalMemory = sysinfoService.getHumanReadableSize(sysinfoService.getTotalMemory());
    this.cpus = sysinfoService.getCpus();
    this.user = sysinfoService.getUser();
    this.home = sysinfoService.getHome();
    this.hostname = sysinfoService.getHostname();

    // calculating system start
    this.uptimeDate.setSeconds(sysinfoService.getUptimeSeconds());
    const startupDate = new Date(new Date().valueOf() - this.uptimeDate.valueOf());
    this.startup = dateFormat(startupDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

    // refreshing uptime
    sysinfoService.getUptime().subscribe(uptime => {
      this.uptimeDate = new Date(null);
      this.uptimeDate.setSeconds(uptime);
    });
  }

  ngOnInit() {
  }

}
