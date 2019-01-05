import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Axis, SerieValue, DotConfig } from '../model/chart-params';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import { config } from 'rxjs';
/**
 * A SVG circle component that handles actions related to dots (left-click, right click, ...)
 */
@Component({
  selector: 'circle[app-curve-dot]',
  // templateUrl: 'curve-dot.component.html',
  template: '', // `<svg:circle id="dot-{{idx}}" fill="data.config.colorHex()"></svg:circle>`,
  styleUrls: ['./curve-dot.component.css']
})
export class CurveDotComponent implements AfterViewInit {

  @Input()
  color: string;

  @Input()
  yAxis: Axis;

  @Input()
  xAxis: Axis;

  @Input()
  data: SerieValue;

  @Input()
  idx: number;

  @Input()
  config: DotConfig;

  /*
   * Internal implementations, DO NOT USE
   */
  _color: string;
  _yAxis: Axis;
  _xAxis: Axis;
  _data: SerieValue;
  _idx: number;
  _config: DotConfig;

  constructor() { }

  ngAfterViewInit() {
    this._color = this.color;
    this._data = this.data;
    this._yAxis = this.yAxis;
    this._xAxis = this.xAxis;
    this._idx = this.idx;
    this._config = this.config;

    this.positionDot();
  }

  /**
   * Calculate dot position using D3JS function
   */
  positionDot() {
    d3Selection.select(`#dot-${this._idx}`)
    .attr('cx', this._xAxis.function(this._data.x))
    .attr('cy', this._yAxis.function(this._data.y))
    .attr('r', this._config.diameter);
    console.log(d3Selection.select(`#dot-${this._idx}`));
  }

}
