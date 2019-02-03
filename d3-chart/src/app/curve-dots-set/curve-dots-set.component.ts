import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Serie, Axis, SerieValue } from '../model/chart-params';
import * as d3Selection from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Transition from 'd3-transition';

/**
 * Represents a group of dots belonging to same serie.
 * Equivalent to an <app-curve>
 */
@Component({
  selector: 'g[app-curve-dots-set]',
  // templateUrl: 'curve-dots-set.component.html',
  template: `<svg:circle
  class='dot'
  *ngFor='let dot of _data.values; let i = index'
  [attr.cx]='_xAxis.function(dot.x)'
  [attr.cy]='_yAxis.function(dot.y)'
  clip-path="url(#clip)"
  id='dot-{{i}}'
  [attr.r]='_data.header.dotConfig.diameter'
  [attr.fill]="_data.header.dotConfig.colorHex(dot.dotConfigData)"
  (click)='onClickDot(i)'
  (mouseover)="onMouseOverDot(i, $event)"
  (mouseleave)="onMouseLeave()"
  (click)="onSelectDot(i,$event)"
  ></svg:circle>`,
  styleUrls: ['./curve-dots-set.component.css']
})
export class CurveDotsSetComponent implements OnChanges {

  @Input()
  data: Serie;
  @Input()
  xAxis: Axis;
  @Input()
  yAxis: Axis;

  @Input()
  tooltip: string;

  @Output()
  selectAbscissa: EventEmitter<number> = new EventEmitter();

  _data: Serie;
  _xAxis: Axis;
  _yAxis: Axis;
  _tooltip: string;

  ABSCISSA_LINE_CLASS_NAME = 'dot-selection-abscissa';



  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    if (changes.xAxis) {
      this._xAxis = changes.xAxis.currentValue;
    }
    if (changes.yAxis) {
      this._yAxis = changes.yAxis.currentValue;
    }

    this.updateDots();
  }


  /**
   * Selects current set and updates their positions
   */
  updateDots() {

  }


  /**
   * When user hovers dot, user-defined behaviour is executed.
   *
   * For the moment, implementing a default behaviour (tooltip open)
   * @param i dot position
   */
  onMouseOverDot(i: number, $event) {
    if (this._data.values.length < i) {
      return;
    }
    this.defaultHoverTooltipBehaviour(this._data.values[i], $event);
    // this._data.header.dotConfig.hover(this._data.values[i]);
  }


  onMouseLeave() {
    d3Selection.select('[app-dot-tooltip]').style('opacity', '0');
  }
  /**
   * When user clicks a dot on the chart, it must be highlighted along with other dots sharing same abscissa
   * @param i position of dot in _data.values
   */
  onClickDot(i: number) {
    if (this._data.values.length < i) {
      return;
    }
  }

  defaultHoverTooltipBehaviour(d: SerieValue, event) {

    const div = d3Selection.select('div[app-dot-tooltip]')
      .style('width', '150px')
      .style('position', 'absolute')
      .style('opacity', 0.9)
      .style('left', event.x + 28 + 'px')
      .style('top', event.y - 28 + 'px');

    const formatTime = d3TimeFormat.timeFormat('%d/%m/%Y %H:%M');

    div.html(`Date : ${formatTime(d.x)}
    <br/>Valeur : ${d.y}
    <br/><hr/>
    Qualifications : <br/> <br/>
    Normalité : <b>${d.dotConfigData.normality ? d.dotConfigData.normality.label : 'ø'} </b><br/>
    Validité : <b>${d.dotConfigData.validity ? d.dotConfigData.validity.label : 'ø'} </b><br/>
    Reconstitution : <b>${d.dotConfigData.reconstitution ? d.dotConfigData.reconstitution.label : 'ø'} </b> <br/>
    Cohérence : <b>${d.dotConfigData.coherence ? d.dotConfigData.coherence.label : 'ø'} </b>`);
  }

  /**
   * When selecting dot, draw dashed vertical line at given abscissa
   * @param i id of clicked dot
   * @param $event event data
   */
  onSelectDot(i, $event) {

    d3Selection.selectAll(`.${this.ABSCISSA_LINE_CLASS_NAME}`).remove();

    console.log('>>> Intercepted dot click >>>');
    const abscissa = this._data.values[i].x;
    const line = d3Shape.line()
      .x(() => {
        // console.log('Calculated X position : ' + this._xAxis.function(abscissa));
        return this._xAxis.function(abscissa);
      })
      .y((d) => {
        // console.log('Calculated Y position for ' + d + ' : ' + this._yAxis.function(d));
        return this._yAxis.function(d);
      });


    const chartG = d3Selection.select('#chart');

    // console.log('>>> chartG : ');
    // console.log(chartG);

    // console.log('>>> line :');
    // console.log(line);
    // console.log('>>> abscissa :');
    // console.log(abscissa);

    // console.log('>>> min and max');
    // console.log(this._getMinAndMaxValueForArray(this._data.values.map(d => d.y)));
    chartG.append('path')//
      .attr('class', this.ABSCISSA_LINE_CLASS_NAME)//
      .datum(this._getMinAndMaxValueForArray(this._data.values.map(d => d.y)))
      .attr('d', line)
      .attr('stroke', 'black')
      .attr('stroke-dasharray', '10 10')
      .attr('stroke-width', 3);

      this.selectAbscissa.emit(abscissa);
  }


  _getMinAndMaxValueForArray(arr: Array<number>) {
    let min: number;
    let max: number;

    for (const val of arr) {
      // console.log('----------------------');
      // console.log('Min : ' + min);
      // console.log('Max : ' + max);
      // console.log('Val : ' + val);

      if (!min) {
        min = val;
      }
      if (!max) {
        max = val;
      }
      min = val < min ? val : min;
      max = val > max ? val : max;
    }
    return min && max ? [min, max] : [];
  }

}
