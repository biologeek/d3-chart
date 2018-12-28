import { Component, Input, OnInit } from '@angular/core';

import * as d3Selection from 'd3-selection';
import { ChartConfiguration, Dimensions } from '../model/chart-params';

@Component({
  selector: 'g[app-clip-path]',
  template: `<svg:defs></svg:defs>`,
  styleUrls: ['./clip-path.component.css']
})
export class ClipPathComponent implements OnInit {

  @Input()
  dimensions: Dimensions;

  constructor() { }

  ngOnInit() {
    d3Selection.select('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.dimensions.width - this.dimensions.margins.left
        - this.dimensions.margins.right)
      .attr('height', this.dimensions.height - this.dimensions.margins.bottom
        - this.dimensions.margins.top)
      .attr('transform', `translate(${this.dimensions.margins.left},
        ${this.dimensions.margins.top})`);
  }

}
