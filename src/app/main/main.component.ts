import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'em-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {
  private sidenavOpen = false;

  constructor() { }

  ngOnInit() {
  }

}
