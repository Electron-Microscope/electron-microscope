import { Component, OnInit, NgZone, HostListener } from '@angular/core';
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
    this.setSidenavMode();
  }

  get sidenavOpen(): boolean {
    if (this.sidenavMode == 'side') { return true; }
    return this._sidenavOpen;
  }

  set sidenavOpen(value: boolean) {
    if (this.sidenavMode != 'side') { this._sidenavOpen = value; }
  }

  @HostListener('window:resize', ['$event'])
  private setSidenavMode() {
    const width = window.innerWidth;
    if (width > 1100) {
      this.sidenavMode =  'side';
    } else {
      this.sidenavMode =  'over';
    }
  }
}
