import { Component } from '@angular/core';
import { ChartConfiguration } from './model/chart-params';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'd3-chart';

  chartConfig: ChartConfiguration = {
    dimensions: {
      height: 250,
      width: 500
    },
    xAxis: {
      id: 1,
      label: 'Date',
      max: 10,
      min: 0
    },
    data: {
      x: {
        min: 0,
        max: 100
      },
      headers: null,
      values: null,
      y: null
    },
    margins: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    },
    yAxes: [{
      id: 1,
      label: 'Axe 1',
      max: 50,
      min: 0
    },{
      id: 2,
      label: 'Axe 2',
      max: 100,
      min: 0
    }]
  };
}
