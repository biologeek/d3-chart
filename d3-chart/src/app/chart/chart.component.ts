import { Component, Input, AfterViewInit } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Series } from '../model/chart-params';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {


  /**
   * margins are in px.
   * Format : [left, right, top, bottom]
   */
  @Input()
  chartConfiguration: ChartConfiguration;
  serie: number;

  @Input()
  data: Series;

  constructor() { }

  ngAfterViewInit() {

    // console.log(this.chartConfiguration);


    this.serie = 0;

    d3Selection.select('#chart')
      .attr('transform', `translate(${this.chartConfiguration.dimensions.margins.left},
        ${this.chartConfiguration.dimensions.margins.right})`)
      .attr('width', this.chartConfig1uration.dimensions.width -
        this.chartConfiguration.dimensions.margins.left - this.chartConfiguration.dimensions.margins.right)
      .attr('height', this.chartConfiguration.dimensions.height -
        this.chartConfiguration.dimensions.margins.top - this.chartConfiguration.dimensions.margins.bottom);
  }


}
