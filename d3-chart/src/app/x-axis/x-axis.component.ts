import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import { Axis, Dimensions, Series } from '../model/chart-params';

@Component({
  selector: 'g[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements /*OnInit, */OnChanges, OnDestroy {


  @Input()
  xAxisConfig: Axis;

  @Input()
  autoScale: boolean;

  @Input()
  data: Series;

  @Input()
  brushPosition: Array<number>;

  @Input()
  chartDimensions: Dimensions;

  @Output()
  xAxisBuilt: EventEmitter<Axis> = new EventEmitter();

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _xAxisConfig: Axis;
  _data: Series;
  _brushPosition: Array<number>;
  _originalAxis: Axis;

  x: any;
  constructor() { }

  /*ngOnInit() {
    this._chartDimensions = this.chartDimensions;
    this._xAxisConfig = this.xAxisConfig;
  }*/

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartDimensions) {
      this._chartDimensions = changes.chartDimensions.currentValue;
    }
    if (changes.xAxisConfig && changes.xAxisConfig.currentValue !== this._xAxisConfig) {
      this._xAxisConfig = changes.xAxisConfig.currentValue;
    }
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    if (changes.brushPosition) {
      this._brushPosition = changes.brushPosition.currentValue;
    }
    if (!this._originalAxis || this._xAxisConfig.updateOriginal) {
      this._originalAxis = Object.assign({}, this._xAxisConfig);
    }
    this.buildAxis();


    if (!this._originalAxis || this._xAxisConfig.updateOriginal) {
      console.log('Not ignored !!');
      this._xAxisConfig.updateOriginal = false;
    }
  }

  ngOnDestroy() {
  }

  buildAxis() {

    if (this._originalAxis.function) {
      this._originalAxis.function.domain(d3Array.extent([].concat(this._data.series.map(s => s.values.map(a => new Date(a.x))))[0]));
    } else {
      this._originalAxis.function = this._xAxisConfig.function;
    }

    const leftBound = this._chartDimensions.margins.left;
    const rightBound = this._chartDimensions.width - this._chartDimensions.margins.right - this._chartDimensions.margins.left;
    this.x = d3Scale.scaleTime()
      .range([leftBound, rightBound]);

      /*
       * If autoscale is on  
       */
    if (this.autoScale && !(this._brushPosition && this._originalAxis.function
       /*&& (this._brushPosition[0] > leftBound || this._brushPosition[1] < rightBound)*/)) {

      this.x.domain(d3Array.extent([].concat(this._data.series.map(s => s.values.map(a => new Date(a.x))))[0]));

    } else if (this._brushPosition && this._originalAxis.function) {

      console.log('YOUYOU' + [this._originalAxis.function.invert(this._brushPosition[0]),
      this._originalAxis.function.invert(this._brushPosition[1])]);
      this.x.domain([
        this._originalAxis.function.invert(this._brushPosition[0]),
        this._originalAxis.function.invert(this._brushPosition[1])
      ]);

    } else {
      this.x.domain([
        this._xAxisConfig.min,
        this._xAxisConfig.max
      ]);
    }
    // console.log([this._chartDimensions.margins.left,
    // this._chartDimensions.width - this._chartDimensions.margins.right - this._chartDimensions.margins.left]);
    this._xAxisConfig.function = this.x;
    this.generateAxis();

    this._xAxisConfig = Object.assign({}, this._xAxisConfig);
    // this._originalAxis = Object.assign({}, this._xAxisConfig);
    this.xAxisBuilt.emit(this._xAxisConfig);
  }

  generateAxis() {
    // console.log(d3Selection.select('[app-x-axis]'));
    d3Selection.select('[app-x-axis]')
      .attr('transform', `translate(0, ${this._chartDimensions.height
        - this._chartDimensions.margins.bottom})`)
      .attr('stroke-width', 2)
      .call(
        d3Axis.axisBottom(this.x)
          .ticks(10)
          .tickFormat(d3TimeFormat.timeFormat('%d/%m/%Y %H:%M:%S'))
      ).selectAll('text')
      .attr('fill', 'black')
      .attr('transform', 'rotate(-45)')
      .attr('font-size', '0.5rem')
      .attr('dx', '-1.5rem')
      .attr('dy', '0.7rem');
  }

}
