import { Injectable } from '@angular/core';
import {arch, hostname, platform, release, type, uptime} from "os";

@Injectable()
export class SystemInfoService {

  constructor() {
  }

  public getData(): String {
    let output:String = "Arch "+arch()+" ........ ";
    output += "hostname "+hostname()+" ........ ";
    output += "platform "+platform()+" ........ ";
    output += "release "+release()+" ........ ";
    output += "type "+type()+" ........ ";
    output += "uptime "+uptime()+" ........ ";

    return output;
  }

}
