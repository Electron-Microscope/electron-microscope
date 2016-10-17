import { Component, OnInit } from '@angular/core';
import { SystemInfoService } from './shared/system-info/system-info.service';

@Component({
  selector: 'em-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css'],
  providers: [SystemInfoService]
})
export class SystemInfoComponent implements OnInit {
  private os: String;
  private arch: String;
  private release: String;
  private user: String;
  private home: String;
  private hostname: String;
  private uptimeDate = new Date(null);
  private sysup = new Date(null);

  constructor(private sysinfoService: SystemInfoService) {
    this.os = sysinfoService.getOS();
    this.arch = sysinfoService.getArch();
    this.release = sysinfoService.getRelease();
    this.user = sysinfoService.getUser();
    this.home = sysinfoService.getHome();
    this.hostname = sysinfoService.getHostname();

    // calculating system start
    this.uptimeDate.setSeconds(sysinfoService.getUptimeSeconds());
    this.sysup = new Date(new Date().valueOf() - this.uptimeDate.valueOf());

    // refreshing uptime
    sysinfoService.getUptime().subscribe(uptime => {
      this.uptimeDate = new Date(null);
      this.uptimeDate.setSeconds(uptime);
    });
  }

  ngOnInit() {
  }

}
