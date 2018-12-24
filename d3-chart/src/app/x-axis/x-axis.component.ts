import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { Axis, Dimensions } from '../model/chart-params';

@Component({
  selector: 'g[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements OnInit, OnChanges, OnDestroy {


  @Input()
  xAxisConfig: Axis;
  @Input()
  chartDimensions: Dimensions;

  /**
   * Internal implementation
   */
  _chartDimensions: Dimensions;
  _xAxisConfig: Axis;

  x: any;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this._chartDimensions = changes.chartDimensions.currentValue;
    this._xAxisConfig = changes.xAxisConfig.currentValue;
  }

  ngOnDestroy() {
  }

  buildAxis() {
    this.x = d3Scale.scaleTime()
      .range([this._chartDimensions.margins.left,
      this._chartDimensions.width - this._chartDimensions.margins.right - this._chartDimensions.margins.left])
      .domain(
        d3Array.extent([this._xAxisConfig.min, this._xAxisConfig.max])
      );
    this._xAxisConfig.function = this.x;
    this.generateAxis();
  }

  generateAxis() {
    d3Selection.select('[app-x-axis]')
      .attr('transform', `translate(0, ${this._chartDimensions.height
        - this._chartDimensions.margins.bottom})`)
      .attr('stroke-width', 2)
      .call(
        d3Axis.axisBottom(this.x)
        /*.ticks(10)
        .tickFormat(d3TimeFormat.timeFormat('%d/%m/%Y %H:%M'))*/
      ).selectAll('text')
      .attr('fill', 'black')
      .attr('transform', 'rotate(-45)')
      .attr('font-size', '0.9rem')
      .attr('dx', '-1.5rem')
      .attr('dy', '0.7rem');
  }

}
