import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Series, LineType } from './model/chart-params';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'd3-chart';

  chartConfig: ChartConfiguration;

  chartData: Series;

  constructor() { }

  ngOnInit() {

    const axisX = {
      id: 1,
      label: 'Date',
      max: 10,
      min: 0
    };
    const axisY = {
      id: 1,
      label: 'Axe 1',
      max: 50,
      min: 0
    };

    this.chartConfig = {
      dimensions: {
        height: 500,
        width: 900,
        margins: {
          left: 100,
          right: 10,
          top: 50,
          bottom: 60
        }
      },
      xAxis: axisX,
      yAxes: [axisY, {
        id: 2,
        label: 'Axe 2',
        max: 100,
        min: 0
      }]
    };

    this.chartData = {
      x: {
        min: new Date(0),
        max: new Date(100)
      },
      y: [{
        min: 0,
        max: 100
      }],
      series: [{
        header:
        {
          axis: 0,
          id: 0,
          color: 'green',
          line: LineType.LINE
        },
        x: axisX,
        y: axisY,
        values:
          [
            {
              x: new Date(5),
              y: 10
            }, {
              x: new Date(10),
              y: 20
            }, {
              x: new Date(30),
              y: 10
            }, {
              x: new Date(40),
              y: 15
            }, {
              x: new Date(50),
              y: 50
            }, {
              x: new Date(60),
              y: 15
            }, {
              x: new Date(80),
              y: 1
            }
          ]
      }]
    };
  }

}
