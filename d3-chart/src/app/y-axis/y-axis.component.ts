import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { ChartConfiguration } from '../model/chart-params';
import { EventsService, MessageType } from '../services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.css']
})
export class YAxisComponent implements AfterViewInit, OnDestroy {

  @Input()
  chartConfiguration: ChartConfiguration;

  @Input()
  axisNumber: number;

  y: any;

  sub: Subscription;

  constructor(private eventsService: EventsService) { }

  ngAfterViewInit() {
    this.updateAxis();
/*
    this.sub = this.eventsService.subscribe((config: ChartConfiguration) => {
      this.chartConfiguration = config;
      this.updateAxis();
    }, MessageType.DATA_UPDATE);*/
  }

  updateAxis() {
    const currentAxis = this.chartConfiguration.yAxes[this.axisNumber];

    this.y = d3Scale
      .scaleLinear()
      .range([this.chartConfiguration.dimensions.height - this.chartConfiguration.margins.bottom
        , this.chartConfiguration.margins.bottom])
      .domain([currentAxis.min, currentAxis.max]);

    currentAxis.function = this.y;

    d3Selection.select(`g#y-axis-${this.axisNumber}`)
      .attr('transform', 'translate('
        + (this.chartConfiguration.margins.left - this.axisNumber * 50)
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
    // this.eventsService.broadcast(MessageType.Y_AXIS_CREATE, this.chartConfiguration);
  }

  assignAxis() {
    this.chartConfiguration.yAxes[this.axisNumber].function = this.y;
  }

  ngOnDestroy() {
   // this.sub.unsubscribe();
  }

}
