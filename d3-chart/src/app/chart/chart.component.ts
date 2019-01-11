import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Series, Dimensions, Axis, AutoScale } from '../model/chart-params';


/**
 * Represents a chart. Here are set up chart dimensions and margins from the configuration injected by caller.
 * Changes from components that trigger other components of the chart are handled here (eg brush modification, ...) 
 */
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {


  /**
   * margins are in px.
   * Format : [left, right, top, bottom]
   */
  @Input()
  dimensions: Dimensions;
  /**
   * X axis configuration
   */
  @Input()
  xAxis: Axis;
  /**
   * Possibility to have several Y axes in the same chart and assign a curve or a set of points to a specific axis.
   * <br>
   * This will be useful for updating only paths or dots sets attached to the modified axis.
   */
  @Input()
  yAxes: Axis[];
  /**
   * Data series configuration.
   */
  @Input()
  data: Series;


  /**
   * Auto scaling of axes X and Y separtely. Default is both axes auto scaled.
   */
  @Input()
  autoScale: AutoScale;

  /**
   * Internal implementations
   */
  _autoScale: AutoScale;
  _xAxis: Axis;
  _yAxes: Axis[] = [];
  _dimensions: Dimensions;
  _data: Series;
  _axesReady: boolean[] = [false, false];


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dimensions) {
      this._dimensions = changes.dimensions.currentValue;
    }
    if (changes.xAxis) {
      this._xAxis = changes.xAxis.currentValue;
    }
    if (changes.yAxes) {
      this._yAxes = changes.yAxes.currentValue;
    }
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    if (changes.autoScale) {
      this._autoScale = changes.autoScale.currentValue;
    }
    this._data.series.map(serie => {
      serie.x = this._xAxis;
      serie.y = this._yAxes[serie.header.axis];
    });
    // console.log(this._xAxis);
    // console.log(this._yAxes);
    // console.log(this._dimensions);
    // console.log(this._data);
  }

  ngOnInit() {
    this._dimensions = Object.assign({}, this.dimensions);
    this._xAxis = Object.assign({}, this.xAxis);
    this._yAxes = this.yAxes;
    this._data = Object.assign({}, this.data);
    if (this.autoScale) {
      this._autoScale = this.autoScale;
    } else {
      this._autoScale = { x: true, y: true };
    }

    // console.log(this.chartConfiguration);
    // console.log(this._xAxis);
    // console.log(this._yAxes);
    // console.log(this._dimensions);
    // console.log(this._data);

    d3Selection.select('#chart')
      .attr('width', this.dimensions.width -
        this.dimensions.margins.left - this.dimensions.margins.right)
      .attr('height', this.dimensions.height -
        this.dimensions.margins.top - this.dimensions.margins.bottom);
  }


  onXAxisChange(event) {
    console.log(event);
    this._axesReady[0] = event;
    console.log(this._xAxis);
  }



  onBrushXChange($brushRange) {
/*    this._xAxis.min = $brushRange[0];
    this._xAxis.max = $brushRange[1];
    // Change reference to trigger change event
    this._xAxis = Object.assign({}, this._xAxis);
  */}
}
