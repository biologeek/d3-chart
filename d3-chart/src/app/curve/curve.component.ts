import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { Series, Axis } from '../model/chart-params';

@Component({
  selector: 'g[app-curve]',
  template: `<svg:path id="path-{{serie}}" class="line"></svg:path>`,
  styleUrls: ['./curve.component.css']
})
export class CurveComponent implements OnInit, OnChanges {

  @Input()
  data: Series;
  @Input()
  xAxis: Axis;
  @Input()
  yAxes: Axis[];

  _data: Series;
  _xAxis: Axis;
  _yAxes: Axis[];

  @Input()
  serie: number;

  line: any;

  constructor() { }

  ngOnInit() {
      this.defineLine();
      this.drawLine();
  }
  ngOnChanges(changes: SimpleChanges) {
    this._data = changes.data.currentValue;
    this._xAxis = changes.xAxis.currentValue;
    this._yAxes = changes.yAxes.currentValue;
    this.defineLine();
    this.drawLine();
  }

  defineLine() {
    if (this._xAxis && this._yAxes) {
      if (this._xAxis.function && this._yAxes[this.serie].function) {
        this.line = d3Shape.line()//
          .x(d => {
            console.log(this._xAxis);
            this._xAxis.function(d.x);
          })//
          .y(d => this._yAxes[this.serie].function(d.y));
      }
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
