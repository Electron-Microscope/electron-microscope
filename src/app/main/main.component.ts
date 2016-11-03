import { Component, OnInit, NgZone } from '@angular/core';
import { OverlayService } from './shared/overlay.service';

@Component({
  selector: 'em-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  private _sidenavOpen = false;
  private sidenavMode = 'over';



  constructor(private ngZone: NgZone, private overlayService: OverlayService) { }

  ngOnInit() {
    this.sidenavMode = this.getSidenavMode(Number(window.innerWidth));
    window.onresize = () => {
      this.ngZone.run(() => {
        this.sidenavMode = this.getSidenavMode(Number(window.innerWidth));
      });
    };
  }

  get sidenavOpen(): boolean {
    if (this.sidenavMode == 'side') { return true; }
    return this._sidenavOpen;
  }

  set sidenavOpen(value: boolean) {
    if (this.sidenavMode != 'side') { this._sidenavOpen = value; }
  }

  private getSidenavMode(width: number) {
    if (width > 800) {
      return 'side';
    } else {
      return 'over';
    }
  }
}
