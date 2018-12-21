import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from './model/chart-params';
import { EventsService, MessageType } from './services/events.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'd3-chart';

  chartConfig$: Observable<ChartConfiguration> = of({
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
            x: 5,
            y: 10
          }, {
            x: 10,
            y: 20
          }, {
            x: 30,
            y: 10
          }, {
            x: 40,
            y: 15
          }, {
            x: 50,
            y: 50
          }, {
            x: 60,
            y: 15
          }, {
            x: 80,
            y: 1
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
  });

  constructor(private eventService: EventsService) { }

  ngOnInit() {
  }

}
