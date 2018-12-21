import { Margins, Dimensions, Axis, Series } from "src/app/model/chart-params";
import * as ChartActions from '../actions/chart.actions';




export interface ChartState {
    config: ConfigState;
    data: Series;
}

export interface ConfigState {
    /**
     * Margins between border of SVG element and chart, axis or whatever
     */
    margins: Margins;
    /**
     * Dimensions of SVG element
     */
    dimensions: Dimensions;
    /**
     * Bottom axis configuration
     */
    xAxis: Axis;
    /**
     * Vertical Y axes list
     */
    yAxes: Axis[];
}


export const initialState: ChartState = {
    config: {
        margins: new Margins(),
        dimensions: new Dimensions(),
        xAxis: new Axis(),
        yAxes: new Array<Axis>()
    },
    data: new Series()
}


export function reducer(state = initialState, action: ChartActions.All): ChartState {
    switch (action.type) {

}