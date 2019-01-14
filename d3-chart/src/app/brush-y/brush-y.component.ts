import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Axis, Series, Dimensions } from '../model/chart-params';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Brush from 'd3-brush';
import * as d3Event from 'd3';

@Component({
  selector: 'g[app-brush-y]',
  template: '',
  styleUrls: ['./brush-y.component.css']
})
export class BrushYComponent implements OnInit, OnChanges {


  @Input()
  yAxisConfig: Axis;

  @Input()
  chartDimensions: Dimensions;

  @Input()
  data: Series;

  @Output()
  brushYChange: EventEmitter<any> = new EventEmitter();

  brush: any;

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _yAxisConfig: Axis;
  _firstMove: boolean;

  constructor() { }

  ngOnInit() {

    this._chartDimensions = this.chartDimensions;
    this._yAxisConfig = this.yAxisConfig;

    this.initBrush();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.yAxisConfig) {
      this._yAxisConfig = changes.yAxisConfig.currentValue;
    }
    if (changes.chartDimensions) {
      this._chartDimensions = changes.chartDimensions.currentValue;
    }
  }

  initBrush() {

    this.brush = d3Brush.brushY()
      .extent([
        [0, this._chartDimensions.margins.top],
        [20, this._chartDimensions.height - this._chartDimensions.margins.top - this._chartDimensions.margins.bottom]
      ]).on('end', (d, i) => this.onBrushEnd());

    // console.log(d3Selection.select('g[app-brush-x]'));
    // console.log(this.brush);
    d3Selection.select('g[app-brush-y]')
      .call(this.brush)
      .call(this.brush.move, this._yAxisConfig.function.range());
      this._firstMove = true;
  }


  onBrushEnd() {
    if (!this._firstMove) {
    const sel = d3Event.event.selection;
    console.log(sel);
    this.brushYChange.emit(sel);
    } else {
      console.log('First move');
      this._firstMove = false;
    }
  }

}
