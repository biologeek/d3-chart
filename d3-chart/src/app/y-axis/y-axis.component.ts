import { Component, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';
import { Axis, Dimensions, Series, Serie } from '../model/chart-params';

@Component({
  selector: 'g[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.css']
})
export class YAxisComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input()
  yAxisConfig: Axis;
  @Input()
  chartDimensions: Dimensions;

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _yAxisConfig: Axis;
  _data: Series;
  _autoScale: boolean;

  @Input()
  axisNumber: number;
  @Input()
  autoScale: boolean;

  /**
   * All series, not only the ones bound to this axis
   */
  @Input()
  data: Series;

  @Output()
  functionChange: EventEmitter<any> = new EventEmitter();

  y: any;

  constructor() { }

  ngAfterViewInit() {
    this._data = this.data;
    this._autoScale = this.autoScale;
    this._chartDimensions = this.chartDimensions;
    this._yAxisConfig = this.yAxisConfig;
    this.updateAxis();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chartDimensions) {
      this._chartDimensions = changes.chartDimensions.currentValue;
    }
    if (changes.yAxisConfig) {
      this._yAxisConfig = changes.yAxisConfig.currentValue;
    }
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    if (changes.autoScale) {
      this._autoScale = changes.autoScale.currentValue;
    }
    this.updateAxis();
  }

  updateAxis() {
    if (this._chartDimensions && this._yAxisConfig) {
      console.log('Updating yAxis ' + this.axisNumber);
      console.log([this._yAxisConfig.min, this._yAxisConfig.max]);

      this.y = d3Scale
        .scaleLinear()
        .range([this._chartDimensions.height - this._chartDimensions.margins.bottom
          , this._chartDimensions.margins.bottom]);

      if (this._autoScale) {
        const boundCurves: number[] = [].concat(
          this._data.series
            .filter(s => s.header.axis === this.axisNumber)
            .map(s => s.values.map(t => t.y))
        )[0];
        this.y.domain([Math.min(...boundCurves), Math.max(...boundCurves)]);
      } else {
        this.y.domain([this._yAxisConfig.min, this._yAxisConfig.max]);
      }

      this._yAxisConfig.function = this.y;
      this.buildAxis();
      this._yAxisConfig = Object.assign({}, this._yAxisConfig);
    }
  }

  buildAxis() {
    console.log(d3Selection.select(`[app-y-axis] #y-axis-${this.axisNumber}`));
    d3Selection.select(`#y-axis-${this.axisNumber}`)
      .attr('transform', `translate(${this._chartDimensions.margins.left - this.axisNumber * 50}, 0)`)
      .attr('stroke-width', 2)
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-45)')
      .attr('y', 6)
      .attr('dy', '1.5rem')
      .attr('dx', '0.2rem')
      .attr('fill', '#000')
      .attr('font-size', '1rem')
      .text(this._yAxisConfig.label);
  }
  ngOnDestroy() {
  }

}
