import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';

import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { Series, Axis, Serie } from '../model/chart-params';

@Component({
  selector: 'g[app-curve]',
  template: `<svg:path class="line"></svg:path>`,
  styleUrls: ['./curve.component.css']
})
export class CurveComponent implements AfterViewInit, OnChanges {

  @Input()
  data: Serie;
  @Input()
  xAxis: Axis;
  @Input()
  yAxis: Axis;

  _data: Serie;
  _xAxis: Axis;
  _yAxis: Axis;

  @Input()
  serie: number;

  line: any;

  constructor() { }

  ngAfterViewInit() {
    this._data = this.data;
    this._xAxis = this.xAxis;
    this._yAxis = this.yAxis;
    this.defineLine();
    this.drawLine();
    console.log(this._xAxis);
    console.log(this._yAxis);
    console.log(this._data);
  }
  ngOnChanges(changes: SimpleChanges) {
    this._data = changes.data.currentValue;
    this._xAxis = changes.xAxis.currentValue;
    this._yAxis = changes.yAxis.currentValue;
    this.defineLine();
    this.drawLine();
    console.log(this._xAxis);
    console.log(this._yAxis);
    console.log(this._data);
  }

  defineLine() {
    if (this._xAxis && this._yAxis) {
      if (this._xAxis.function && this._yAxis.function) {
        this.line = d3Shape.line()//
          .x(d => {
            console.log('X '+this._xAxis.function(d.x));
            this._xAxis.function(d.x);
          })//
          .y(d => {
            console.log('y '+this._yAxis.function(d.y));
            return this._yAxis.function(d.y);
          });
      }
    }
  }

  drawLine() {
    if (this.line) {
      console.log(this.line(this._data.values));
      d3Selection.select(`#path-${this._data.header.id} path`)
        // .attr('clip-path', 'url(#clip)')
        .attr('fill', 'none')
        .attr('stroke', this._data.header.color)
        .attr('d', this.line(this._data.values));
    }
  }
}
