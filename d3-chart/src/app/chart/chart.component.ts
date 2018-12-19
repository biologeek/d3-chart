import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration } from '../model/chart-params';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  /**
   * margins are in px.
   * Format : [left, right, top, bottom]
   */
  @Input()
  chartConfiguration: ChartConfiguration;


  constructor() { }

  ngOnInit() {
    d3Selection.select('#chart')
      .attr('transform', `translate(${this.chartConfiguration.margins.left},
        ${this.chartConfiguration.margins.right})`)
      .attr('width', this.chartConfiguration.dimensions.width -
        this.chartConfiguration.margins.left - this.chartConfiguration.margins.right)
      .attr('height', this.chartConfiguration.dimensions.height -
        this.chartConfiguration.margins.top - this.chartConfiguration.margins.bottom)
      /*.append('rect')
      .attr('fill', 'white')
      .attr('width', this.chartConfiguration.dimensions.width -
        this.chartConfiguration.margins.left - this.chartConfiguration.margins.right)
      .attr('height', this.chartConfiguration.dimensions.height -
        this.chartConfiguration.margins.top - this.chartConfiguration.margins.bottom)*/;

  }

}
