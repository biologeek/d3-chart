import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Series, LineType } from './model/chart-params';

import * as _ from 'lodash';


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
      max: 100,
      min: 0
    };
    const axisY = {
      id: 1,
      label: 'Axe 1',
      max: 100,
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
          bottom: 80
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
        min: 0,
        max: 100
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
          line: LineType.LINE,
          maxPoints: 50,
          dotConfig: {
            click: () => {
              window.alert('Click');
            },
            rightClick: () => {
              window.alert('Right Click');
            },
            colorHex: (data: any) => {
              return data > 40 ? '#000000' : '#ff0000';
            },
            diameter: 5
          }
        },
        x: axisX,
        y: axisY,
        values:
          [
            {
              x: 500000,
              y: 10
            }, {
              x: 501000,
              y: 20
            }, {
              x: 502000,
              y: 10
            }, {
              x: 503000,
              y: 15
            }, {
              x: 504000,
              y: 50
            }, {
              x: 505000,
              y: 15
            }, {
              x: 506000,
              y: 1
            }
          ]
      }]
    };
    let i = 0;
    setInterval(() => {

      const newObj: Series = _.cloneDeep(this.chartData);
      const newConfig: ChartConfiguration = _.cloneDeep(this.chartConfig);

      newObj.series[0].values.push({
        x: 500000 + 10000 * i,
        y: Math.random() * 200,
        dotConfigData: Math.random() * 200
      });
      this.chartData = newObj;
     /* newConfig.xAxis.max = 100 + 10 * i;
      newConfig.yAxes[0].max = 20 + 3 * i;
*/
      newObj.series[0].y = newConfig.yAxes[0];

      newObj.series[0].x = newConfig.xAxis;


      this.chartConfig = newConfig;
      console.log('Incrementing : i=' + i);
      i++;
    }, 500000);
  }

}
