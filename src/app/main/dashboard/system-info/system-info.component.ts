import { Component, OnInit } from '@angular/core';
import {SystemInfoService} from "./shared/system-info/system-info.service";

@Component({
  selector: 'em-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css'],
  providers: [SystemInfoService]
})
export class SystemInfoComponent implements OnInit {
  private test = "";

  constructor(private sysinfoService : SystemInfoService) {
    this.test = sysinfoService.getData();
  }

  ngOnInit() {
  }

}
