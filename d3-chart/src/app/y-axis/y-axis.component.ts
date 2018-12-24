import { Component, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import { Axis, Dimensions } from '../model/chart-params';

@Component({
  selector: 'g[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.css']
})
export class YAxisComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  yAxisConfig: Axis;
  @Input()
  chartDimensions: Dimensions;

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _yAxisConfig: Axis;

  @Input()
  axisNumber: number;

  @Output()
  functionChange: EventEmitter<any> = new EventEmitter();

  y: any;


  constructor() { }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this._chartDimensions = changes.chartDimensions.currentValue;
    this._yAxisConfig = changes.yAxisConfig.currentValue;
  }

  updateAxis() {
    if (this._chartDimensions && this._yAxisConfig) {
      console.log('Updating yAxis ' + this.axisNumber);
      const currentAxis = this._yAxisConfig[this.axisNumber];

      this.y = d3Scale
        .scaleLinear()
        .range([this._chartDimensions.height - this._chartDimensions.margins.bottom
          , this._chartDimensions.margins.bottom])
        .domain([currentAxis.min, currentAxis.max]);

      currentAxis.function = this.y;

      d3Selection.select(`g#y-axis-${this.axisNumber}`)
        .attr('transform', 'translate('
          + (this._chartDimensions.margins.left - this.axisNumber * 50)
          + ', 0)')
        .attr('stroke-width', 2)
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('transform', 'rotate(-45)')
        .attr('y', 6)
        .attr('dy', '1.5rem')
        .attr('dx', '0.2rem')
        .attr('fill', '#000')
        .attr('font-size', '1rem')
        .text(currentAxis.label);
    }
  }

  assignAxis() {
    this._yAxisConfig[this.axisNumber].function = this.y;
  }

  ngOnDestroy() {
  }

}
