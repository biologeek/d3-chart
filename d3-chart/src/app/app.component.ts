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
      label: 'Date'
    };
    const axisY = {
      id: 1,
      label: 'Axe 1',
    };

    const axisY2 = {
      id: 2,
      label: 'Axe 2'
    };

    this.chartConfig = {
      dimensions: {
        height: 800,
        width: 2000,
        margins: {
          left: 130,
          right: 100,
          top: 30,
          bottom: 80
        }
      },
      xAxis: axisX,
      yAxes: [axisY, axisY2]
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
          maxPoints: 300,
          dotConfig: {
            click: () => {
              window.alert('Click');
            },
            rightClick: () => {
              window.alert('Right Click');
            },
            colorHex: (data: any) => {
              return data > 0 ? '#000000' : '#ff0000';
            },
            diameter: 3
          }
        },
        x: axisX,
        y: axisY,
        values:
          [
            {
              x: new Date(5000000),
              y: 10,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5010000),
              y: 20,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5020000),
              y: 10,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5030000),
              y: 15,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5040000),
              y: 50,
              dotConfigData: {
                normality: null,
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5050000),
              y: 15,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: null,
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5060000),
              y: 1,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }
          ]
      }, {
        header:
        {
          axis: 0,
          id: 1,
          color: 'blue',
          line: LineType.LINE,
          maxPoints: 300,
          dotConfig: {
            click: () => {
              window.alert('Click');
            },
            rightClick: () => {
              window.alert('Right Click');
            },
            colorHex: (data: any) => {
              return '#000000'; // : '#ff0000';
            },
            diameter: 3
          }
        },
        x: axisX,
        y: axisY,
        values:
          [
            {
              x: new Date(5000000),
              y: 20,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5010000),
              y: 10,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5020000),
              y: 20,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5030000),
              y: 14,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5040000),
              y: 20,
              dotConfigData: {
                normality: null,
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5050000),
              y: 10,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: null,
                coherence: { id: 1, label: 'Cohérente' }
              }
            }, {
              x: new Date(5060000),
              y: 10,
              dotConfigData: {
                normality: { id: 1, label: 'Normal' },
                validity: { id: 1, label: 'Valide' },
                reconstitution: { id: 1, label: 'Non reconstituée' },
                coherence: { id: 1, label: 'Cohérente' }
              }
            }
          ]
      }]
    };
    let i = 0;
    setInterval(() => {

      const newObj: Series = _.cloneDeep(this.chartData);
      const newConfig: ChartConfiguration = _.cloneDeep(this.chartConfig);

      newObj.series[0].values.push({
        x: new Date(6000000 + 100000 * i),
        y: Math.random() * 200,
        dotConfigData: {
          normality: { id: 1, label: 'Normal' },
          validity: { id: 1, label: 'Valide' },
          reconstitution: { id: 1, label: 'Non reconstituée' },
          coherence: { id: 1, label: 'Cohérente' }
        }
      });

      newObj.series[1].values.push({
        x: new Date(6000000 + 100000 * i),
        y: Math.random() * 20000,
        dotConfigData: {
          normality: { id: 1, label: 'Normal' },
          validity: { id: 1, label: 'Valide' },
          reconstitution: { id: 1, label: 'Non reconstituée' },
          coherence: { id: 1, label: 'Cohérente' }
        }
      });
      this.chartData = newObj;
      /* newConfig.xAxis.max = 100 + 10 * i;
       newConfig.yAxes[0].max = 20 + 3 * i;
 */
      newObj.series[0].y = newConfig.yAxes[0];

      newObj.series[0].x = newConfig.xAxis;
      newObj.series[1].y = newConfig.yAxes[0];

      newObj.series[1].x = newConfig.xAxis;


      this.chartConfig = newConfig;
      console.log('Incrementing : i=' + i);
      i++;
    }, 6000);
  }

}
