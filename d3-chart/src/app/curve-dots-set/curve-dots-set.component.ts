import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Serie, Axis, SerieValue } from '../model/chart-params';
import * as d3Selection from 'd3-selection';
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
  [attr.cx]='_data.x.function(dot.x)'
  [attr.cy]='_data.y.function(dot.y)'
  id='dot-{{i}}'
  [attr.r]='_data.header.dotConfig.diameter'
  [attr.fill]="_data.header.dotConfig.colorHex(dot.dotConfigData)"
  (click)='onClickDot(i)'
  (mouseover)="onMouseOverDot(i, $event)"
  (mouseleave)="onMouseLeave()"
  ></svg:circle>`,
  styleUrls: ['./curve-dots-set.component.css']
})
export class CurveDotsSetComponent implements OnInit, OnChanges {

  @Input()
  data: Serie;

  @Input()
  tooltip: string;


  _data: Serie;

  constructor() { }

  ngOnInit() {
    this._data = this.data;
    this.updateDots();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this._data = changes.data.currentValue;
    }
    if (changes.xAxis) {
      this._data.x = changes.xAxis.currentValue;
    }
    if (changes.yAxis) {
      this._data.y = changes.yAxis.currentValue;
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

}
