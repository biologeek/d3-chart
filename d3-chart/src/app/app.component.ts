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
      height: 500,
      width: 900
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
      headers: [
        {
          axis: 0,
          id: 0,
          color: 'green'
        }
      ],
      values: [
        [
          {
            x: 0.5,
            y: 10
          },{
            x: 0.6,
            y: 10
          },{
            x: 0.7,
            y: 10
          },{
            x: 0.8,
            y: 10
          }
        ]
      ],
      y: null
    },
    margins: {
      left: 100,
      right: 10,
      top: 50,
      bottom: 60
    },
    yAxes: [{
      id: 1,
      label: 'Axe 1',
      max: 50,
      min: 0
    }, {
      id: 2,
      label: 'Axe 2',
      max: 100,
      min: 0
    }]
  };
}
