import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

import * as d3Selection from 'd3-selection';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  @ViewChild('.chart')
  chartRef: ElementRef;
  private chart: any;

  @ViewChild('app-x-axis')
  private xAxis: ElementRef;




  /**
   * margins are in px.
   * Format : [left, right, top, bottom]
   */
  @Input()
  margins: number[] = [10, 10, 10, 10];

  @Input()
  width = 250;
  @Input()
  height = 250;


  constructor() { }

  ngOnInit() {
    d3Selection.select(this.chartRef.nativeElement)
      .attr('transform', `translate(${this.margins[0]}, ${this.margins[2]})`)
      .attr('width', this.width - this.margins[0] - this.margins[1])
      .attr('height', this.height - this.margins[2] - this.margins[3]);

  }

}
