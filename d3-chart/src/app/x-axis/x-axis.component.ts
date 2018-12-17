import { Component, OnInit, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import { ChartConfiguration } from '../model/chart-params';

@Component({
  selector: 'app-x-axis',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.css']
})
export class XAxisComponent implements OnInit {

  chartConfiguration: ChartConfiguration;

  constructor() { }

  ngOnInit() {
    const x = d3Scale.scaleTime()
    .range([]);

    d3Selection.select('.x-axis');
  }

}
