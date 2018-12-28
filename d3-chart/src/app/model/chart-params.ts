export class ChartConfiguration {

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

export class AutoScale {
    x: boolean;
    y: boolean;
}

export class Dimensions {
    height: number;
    width: number;
    /**
    * Margins between border of SVG element and chart, axis or whatever
    */
   margins: Margins;
}

export class Axis {
    id: number;
    label: string;
    min: any;
    max: any;
    function?: Function;
}

export class Series {
    series: Array<Serie>;
    x: MinMaxValues<number>;
    y: Array<MinMaxValues<number>>;
}

export class Serie {
    header: SerieHeader;
    values: SerieValues;
    y: Axis;
    x: Axis;
}


export class MinMaxValues<T> {
    min: T;
    max: T;
}

export class SeriesValues extends Array<SerieValues> {}

export class SerieValues extends Array<SerieValue> {}

export class SerieValue {
    x: any;
    y: number;
}
export class SeriesHeaders extends Array<SerieHeader> {
}

export class SerieHeader {
    id: number;
    axis: number;
    color: string;
    line: LineType;
    maxPoints?: number;
}

export enum LineType {
    LINE, DASHED, DOTTED
}

export class Margins {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
