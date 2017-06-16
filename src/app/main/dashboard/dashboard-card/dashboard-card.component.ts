import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'em-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public subtitle: string;



  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'em-dashboard-card-chart',
  template: '<ng-content></ng-content>'
})
export class DashboardCardChartComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'em-dashboard-card-content',
  template: '<ng-content></ng-content>'
})
export class DashboardCardContentComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'em-dashboard-card-detail-content',
  template: '<ng-content></ng-content>'
})
export class DashboardCardDetailContentComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}

@Component({
  selector: 'em-dashboard-card-actions',
  template: '<ng-content></ng-content>'
})
export class DashboardCardActionsComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
