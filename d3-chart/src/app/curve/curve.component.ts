import { Component, OnInit, Input } from '@angular/core';

import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Series, Serie } from '../model/chart-params';

@Component({
  selector: 'g[app-curve]',
  template: `<svg:path id="path-{{serie.header.id}}" class="line"></svg:path>
  `,
  styleUrls: ['./curve.component.css']
})
export class CurveComponent implements OnInit {

  @Input()
  chartConfig: ChartConfiguration;
  @Input()
  serie: Serie;

  line: any;

  constructor() { }

  ngOnInit() {
    this.defineLine();
    this.drawLine();
    console.log(this.chartConfig.xAxis.function);
  }

  defineLine() {
    this.line = d3Shape.line()//
      .x(d => this.serie.x.function(d))//
      .y(d => this.serie.y.function(d));
  }

  drawLine() {
    d3Selection.select(`#path-${this.serie.header.id}`)
      .attr('clip-path', 'url(#clip)')
      .attr('stroke', this.serie.header.color)
      .attr('d', this.line(this.serie.values));
  }
}
