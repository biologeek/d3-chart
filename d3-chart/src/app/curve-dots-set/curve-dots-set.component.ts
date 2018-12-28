import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Serie, Axis } from '../model/chart-params';

/**
 * Represents a group of dots belonging to same serie.
 */
@Component({
  selector: 'app-curve-dots-set',
  template: `<circle app-curve-dot
  *ngFor="let dot of _data.values"
  [color]="_data.header.color"
  [yAxis]="_yAxis"
  [xAxis]="_xAxis"></app-curve-dot>`,
  styleUrls: ['./curve-dots-set.component.css']
})
export class CurveDotsSetComponent implements OnInit, OnChanges {

  @Input()
  data: Serie;
  @Input()
  xAxis: Axis;
  @Input()
  yAxis: Axis;

  _data: Serie;
  _xAxis: Axis;
  _yAxis: Axis;

  constructor() { }

  ngOnInit() {
    this._data = this.data;
    this._xAxis = this.xAxis;
    this._yAxis = this.yAxis;
  }

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
  }

}
