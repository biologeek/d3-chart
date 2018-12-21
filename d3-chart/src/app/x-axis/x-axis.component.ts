import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import { ChartConfiguration } from '../model/chart-params';
import { EventsService, MessageType } from '../services/events.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'g[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements AfterViewInit {

  @Input()
  chartConfiguration: ChartConfiguration;

  x: any;

  constructor(private eventService: EventsService) { }

  ngAfterViewInit() {
    this.buildAxis();
  }

  buildAxis() {
    this.x = d3Scale.scaleTime()
      .range([this.chartConfiguration.margins.left,
      this.chartConfiguration.dimensions.width - this.chartConfiguration.margins.right - this.chartConfiguration.margins.left])
      .domain(
        d3Array.extent([this.chartConfiguration.data.x.min, this.chartConfiguration.data.x.max])
      );
    this.chartConfiguration.xAxis.function = this.x;
    this.generateAxis();
  }

  generateAxis() {
    d3Selection.select('[app-x-axis]')
      .attr('transform', `translate(0, ${this.chartConfiguration.dimensions.height
        - this.chartConfiguration.margins.bottom})`)
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
