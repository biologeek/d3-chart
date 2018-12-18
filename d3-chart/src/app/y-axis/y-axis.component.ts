import { Component, OnInit, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { ChartConfiguration } from '../model/chart-params';

@Component({
  selector: 'g[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.css']
})
export class YAxisComponent implements OnInit {

  @Input()
  chartConfiguration: ChartConfiguration;

  @Input()
  axisNumber: number;

  y: any;

  constructor() { }

  ngOnInit() {

    const currentAxis = this.chartConfiguration.yAxes[this.axisNumber];

    this.y = d3Scale
      .scaleLinear()
      .range([this.chartConfiguration.dimensions.height - this.chartConfiguration.margins.top, this.chartConfiguration.margins.bottom])
      .domain([currentAxis.min, currentAxis.max]);

    d3Selection.select(`#y-axis-${this.axisNumber}`)
      .attr('transform', 'translate(' + (this.chartConfiguration.margins.left - this.axisNumber * 50) + ', 0)')
      .attr('stroke-width', 2)
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-45)')
      .attr('y', 6)
      .attr('dy', '4rem')
      .attr('fill', '#000')
      .attr('font-size', '1rem')
      .text(currentAxis.label);
  }

}
