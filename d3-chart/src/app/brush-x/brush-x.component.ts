import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Dimensions, Series, Axis } from '../model/chart-params';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Brush from 'd3-brush';
import * as d3Event from 'd3';

@Component({
  selector: 'g[app-brush-x]',
  template: '',
  styleUrls: ['./brush-x.component.css']
})
export class BrushXComponent implements OnInit, OnChanges {


  @Input()
  xAxisConfig: Axis;

  @Input()
  data: Series;

  @Input()
  chartDimensions: Dimensions;

  @Output()
  brushXChange: EventEmitter<any> = new EventEmitter();

  brush: any;

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _xAxisConfig: Axis;
  _data: Series;

  constructor() { }

  ngOnInit() {

    this._chartDimensions = this.chartDimensions;
    this._xAxisConfig = this.xAxisConfig;
    this._data = this.data;

    this.initBrush();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartDimensions) {
      this._chartDimensions = changes.chartDimensions.currentValue;
    }
    if (changes.xAxisConfig) {
      this._xAxisConfig = changes.xAxisConfig.currentValue;
    }
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    this.initBrush();
  }

  initBrush() {

    this.brush = d3Brush.brushX()
      .extent([
        [this._chartDimensions.margins.left, this._chartDimensions.height - 30],
        [this._chartDimensions.width - this._chartDimensions.margins.right, this._chartDimensions.height]
      ]).on('end', (d, i) => this.onBrushEnd());

      // console.log(d3Selection.select('g[app-brush-x]'));
      // console.log(this.brush);
    d3Selection.select('g[app-brush-x]')
      .call(this.brush);
  }

  onBrushEnd() {
    const sel = d3Event.event.selection;
    console.log(sel);
    this.brushXChange.emit(sel);
  }

}
