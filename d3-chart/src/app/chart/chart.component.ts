import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Series, Dimensions } from '../model/chart-params';

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
  config: ChartConfiguration;
  @Input()
  data: Series;

  serie: number;

  _config: ChartConfiguration;
  _data: Series;


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this._config = changes.config.currentValue;
    }
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    console.log(this._config);
    console.log(this._data);
  }

  ngOnInit() {
    this._config = this.config;
    this._data = this.data;
    // console.log(this.chartConfiguration);
    this.serie = 0;

    console.log(this._config);
    console.log(this._data);

    d3Selection.select('#chart')
      .attr('transform', `translate(${this.config.dimensions.margins.left},
        ${this.config.dimensions.margins.right})`)
      .attr('width', this.config.dimensions.width -
        this.config.dimensions.margins.left - this.config.dimensions.margins.right)
      .attr('height', this.config.dimensions.height -
        this.config.dimensions.margins.top - this.config.dimensions.margins.bottom);
  }


}
