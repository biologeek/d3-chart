import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';

import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Series, Serie } from '../model/chart-params';
import { EventsService, MessageType } from '../services/events.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChartState } from '../ngrx/reducers/chart.reducer';

@Component({
  selector: 'g[app-curve]',
  template: `<svg:path id="path-{{serie}}" class="line"></svg:path>`,
  styleUrls: ['./curve.component.css']
})
export class CurveComponent implements AfterViewInit, OnChanges {

  chartConfig: ChartConfiguration;
  data: Series;
  @Input()
  serie: number;

  line: any;

  constructor(private store: Store<ChartState>) { }

  ngAfterViewInit() {
    this.defineLine();
    this.drawLine();
  }

  ngOnChanges() {
    this.defineLine();
    this.drawLine();
  }

  defineLine() {
    console.log(this.chartConfig);
    if (this.chartConfig.xAxis.function && this.chartConfig.yAxes[this.serie].function) {
      this.line = d3Shape.line()//
        .x(d => {
          console.log(this.chartConfig.xAxis);
          this.chartConfig.xAxis.function(d.x);
        })//
        .y(d => this.chartConfig.yAxes[this.serie].function(d.y));
    }
  }

  drawLine() {
    if (this.line) {
      d3Selection.select(`#path-${this.data.headers[this.serie].id}`)
        // .attr('clip-path', 'url(#clip)')
        .attr('fill', 'none')
        .attr('stroke', this.data.headers[this.serie].color)
        .attr('d', this.line(this.data.values[this.serie]));
    }
  }
}
