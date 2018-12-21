import { Component, OnInit, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration } from '../model/chart-params';

@Component({
  selector: 'g[app-clip-path]',
  template: `<svg:defs></svg:defs>`,
  styleUrls: ['./clip-path.component.css']
})
export class ClipPathComponent implements OnInit {

  @Input()
  chartConfiguration: ChartConfiguration;

  constructor() { }

  ngOnInit() {
    d3Selection.select('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.chartConfiguration.dimensions.width - this.chartConfiguration.margins.left - this.chartConfiguration.margins.right)
      .attr('height', this.chartConfiguration.dimensions.height - this.chartConfiguration.margins.bottom - this.chartConfiguration.margins.top)
      .attr('transform', `translate(${this.chartConfiguration.margins.left}, ${this.chartConfiguration.margins.top})`);
  }

}
