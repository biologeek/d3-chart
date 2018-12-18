import { Component, OnInit, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import { ChartConfiguration } from '../model/chart-params';

@Component({
  selector: 'g[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements OnInit {

  @Input()
  chartConfiguration: ChartConfiguration;

  x: any;

  constructor() { }

  ngOnInit() {
    this.x = d3Scale.scaleTime()
      .range([this.chartConfiguration.margins.left, this.chartConfiguration.dimensions.width - this.chartConfiguration.margins.right])
      .domain(
        d3Array.extent([this.chartConfiguration.data.x.min, this.chartConfiguration.data.x.max])
      );
      this.generateAxis();
  }
  generateAxis() {
    d3Selection.select('app-x-axis')
      .attr('transform', `translate(0, ${this.chartConfiguration.dimensions.height
         - this.chartConfiguration.margins.top})`)
      .attr('stroke-width', 2)
      .call(
        d3Axis.axisBottom(this.x)
          .ticks(10)
          .tickFormat(d3TimeFormat.timeFormat('%d/%m/%Y %H:%M'))
      ).selectAll('text')
      .attr('fill', 'black')
      .attr('transform', 'rotate(-45)')
      .attr('font-size', '0.9rem')
      .attr('dx', '-4rem')
      .attr('dy', '0.5rem');
  }

}
