import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'em-modules-nav',
  templateUrl: './modules-nav.component.html',
  styleUrls: ['modules-nav.component.scss']
})
export class ModulesNavComponent implements OnInit {
  @Output()
  public moduleChosen: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
